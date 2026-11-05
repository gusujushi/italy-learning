"""把课程里的"显示文本"规范化成适合语音合成朗读的文本。

显示文本里会有数字、缩写、箭头、省略号、引号等，合成引擎要么读错要么读成怪声。
这里只改"怎么读"，不改音频的查找键——音频查找键始终是显示文本本身（见 js/italian.js 的 speakKey）。
"""
import re

UNITS = ['zero', 'uno', 'due', 'tre', 'quattro', 'cinque', 'sei', 'sette', 'otto', 'nove', 'dieci', 'undici',
         'dodici', 'tredici', 'quattordici', 'quindici', 'sedici', 'diciassette', 'diciotto', 'diciannove']
TENS = {2: 'venti', 3: 'trenta', 4: 'quaranta', 5: 'cinquanta', 6: 'sessanta', 7: 'settanta', 8: 'ottanta', 9: 'novanta'}


def _below_100(n):
    if n < 20:
        return UNITS[n]
    t, u = divmod(n, 10)
    w = TENS[t]
    if u == 0:
        return w
    if u in (1, 8):          # ventuno, ventotto：十位词尾元音省略
        w = w[:-1]
    return w + ('tré' if u == 3 else UNITS[u])


def _below_1000(n):
    h, r = divmod(n, 100)
    out = ''
    if h:
        out = 'cento' if h == 1 else UNITS[h] + 'cento'
    if r:
        w = _below_100(r)
        if h and r // 10 == 8 and False:  # 保留位置：centottanta 的省音在听感上差别极小，这里不处理
            pass
        out += w
    return out


def num2it(n):
    """整数 → 意大利语（0–999999）。"""
    if n < 0:
        return 'meno ' + num2it(-n)
    if n < 100:
        return _below_100(n)
    if n < 1000:
        return _below_1000(n)
    th, r = divmod(n, 1000)
    head = 'mille' if th == 1 else (_below_1000(th) + 'mila')
    return head + (_below_1000(r) if r else '')


# 整串替换：这些显示文本里的片段不能直接读
OVERRIDES = [
    (r'\bWi-Fi\b', 'uai fai'),
    (r'\bcheck-in\b', 'chèc in'),
    (r'\bcheck-out\b', 'chèc aut'),
    (r'\bPIN\b', 'pin'),
    (r'\bTV\b', 'tivù'),
    (r'\bSMS\b', 'esse emme esse'),
    (r'\bCELI\b', 'cèli'),
    (r'\bB12\b', 'bi dodici'),
    (r'\bni hao\b', 'ni ciao'),
    (r'\bFrecciarossa\b', 'Freccia rossa'),
    (r'\bTrenitalia\b', 'Trenitalia'),
    (r'\btaglia L\b', 'taglia elle'),
    (r'\bla taglia L\b', 'la taglia elle'),
    (r'\bL\b(?=\.)', 'elle'),
]


def to_speech(text):
    t = text
    # 行首的序号 "1) " "2. "
    t = re.sub(r'^\s*\d+[.)]\s+', '', t)
    for pat, rep in OVERRIDES:
        t = re.sub(pat, rep, t)
    # 全大写的普通词（AFFITTASI BILOCALE IN CENTRO）→ 小写，避免被当成缩写逐字母读
    letters = re.sub(r'[^A-Za-zÀ-ÿ]', '', t)
    if len(letters) >= 4 and letters.isupper():
        t = t.lower()
    t = re.sub(r'\b[A-ZÀ-Ý]{4,}\b', lambda m: m.group(0).lower(), t)
    # 数字（含 18:30 这类时间）
    t = re.sub(r'(\d{1,2}):(\d{2})', lambda m: num2it(int(m.group(1))) + ' e ' + num2it(int(m.group(2))), t)
    t = re.sub(r'\d+', lambda m: num2it(int(m.group(0))), t)
    # 符号
    t = t.replace('→', ', ').replace('/', ', ').replace('+', ' più ').replace('&', ' e ')
    t = re.sub(r'[“”«»"]', '', t)
    t = re.sub(r'\s*[—–]\s*', ', ', t)
    t = re.sub(r'[()（）]', ' ', t)
    # 省略号：句末省略 → 去掉；句中省略 → 逗号停顿
    t = re.sub(r'(\.{3}|…)\s*(?=[?!.]|$)', '', t)
    t = re.sub(r'\s*(\.{3}|…)\s*', ', ', t)
    t = t.replace('’', "'")
    t = re.sub(r'([.!?])\s*,\s*', r'\1 ', t)      # 句号后的孤立逗号
    t = re.sub(r'\s+,', ',', t)                    # 逗号前的空格
    t = re.sub(r'\s+', ' ', t).strip(' ,')
    return t


# ---------- 音素层面的修正（在 espeak 给出音素之后）----------
# espeak 会把句中独立的 "è"（是）读成不带重音的闭口 e，听起来就成了 "e"（和）；c'è、quant'è 同理。
# （dov'è、cos'è、com'è 之类 espeak 本来就读对了，不用动。）
# 这里在音素层面把这几个词里的 e 换成开口的 ɛ。值：是否同时补上重音符号 ˈ。
OPEN_E = {'è': False, "c'è": True, "quant'è": True}


def _core(tok):
    return re.sub(r"^[^\wÀ-ÿ']+|[^\wÀ-ÿ']+$", '', tok.lower().replace('’', "'"))


def _initial_r_trill(sentences):
    """词首的 r（Roma、ristorante）espeak 给的是闪音 ɾ，合成出来只有约 40 ms，不像意大利语的颤音；
    而 rr 用的 "rɾ" 模型能渲染成真正的颤音。统计：词首 ≥2 次舌尖拍击的比例约 40% → 75%。"""
    out = []
    for s in sentences:
        t = ''.join(s)
        u = re.sub(r'(?:(?<=^)|(?<=[ ,;:!?.]))ɾ', 'rɾ', t)
        out.append(list(u) if u != t else s)
    return out


def fix_phonemes(spoken, sentences):
    """spoken：送去合成的文本；sentences：PiperVoice.phonemize 的结果（每句一个音素字符列表）。
    词数对不上时，"è" 的修正原样跳过——宁可不修，也不能改到错的位置。"""
    sentences = _initial_r_trill(sentences)
    toks = spoken.split()
    words = [''.join(s).split() for s in sentences]
    if sum(len(w) for w in words) != len(toks):
        return sentences
    out, i = [], 0
    for sent, ws in zip(sentences, words):
        changed = False
        for k, w in enumerate(ws):
            stress = OPEN_E.get(_core(toks[i]))
            i += 1
            if stress is None or 'ɛ' in w or 'e' not in w:
                continue
            j = w.rfind('e')
            ws[k] = w[:j] + ('ˈ' if stress and 'ˈ' not in w else '') + 'ɛ' + w[j + 1:]
            changed = True
        out.append(list(' '.join(ws)) if changed else sent)
    return out


def patch_voice(voice):
    """给 PiperVoice 实例装上上面的修正：之后 voice.synthesize*() 内部调用的 phonemize 就是修正过的版本。"""
    orig = voice.phonemize
    voice.phonemize = lambda text: fix_phonemes(text, orig(text))
    return voice


if __name__ == '__main__':
    # 自检：音素修正
    assert fix_phonemes('Qual è il tuo numero?', [list('kwˈal e il tˌʊo nˈumero?')])[0] == list('kwˈal ɛ il tˌʊo nˈumero?')
    assert fix_phonemes("C'è un bar.", [list('tʃe ʊn bˈaɾ.')])[0] == list('tʃˈɛ ʊn bˈaɾ.')
    assert fix_phonemes('È un formaggio.', [list('e ʊn foɾmˈadʒːo.')])[0] == list('ɛ ʊn foɾmˈadʒːo.')
    assert fix_phonemes("Dov'è la stazione?", [list('dovˈɛ la statsiʲˈone?')])[0] == list('dovˈɛ la statsiʲˈone?')   # 已经对了
    assert fix_phonemes('Marco e Li', [list('mˈaɾko e lɪ')])[0] == list('mˈaɾko e lɪ')                                  # "e"（和）不动
    assert fix_phonemes('a b c', [list('a b')]) == [list('a b')]                                                   # 词数对不上：原样返回
    assert fix_phonemes('Roma è bella', [list('ɾˈoma ɛ bˈɛlla')])[0] == list('rɾˈoma ɛ bˈɛlla')                    # 词首 r → 颤音
    assert fix_phonemes('a Roma, tre', [list('a ɾˈoma, tɾˈe')])[0] == list('a rɾˈoma, tɾˈe')                       # 句中词首也改；tr 不动
    assert fix_phonemes('carro padre', [list('kˈarɾo pˈadɾe')])[0] == list('kˈarɾo pˈadɾe')                        # 词中的 ɾ 不动
    for s in ["L'uscita è la B12.", 'Affitto: 750 euro al mese, spese escluse.', 'Nel 2018 ho studiato.',
              'mio / tuo / suo', 'Compro la giacca. → La compro.', 'ti va di…?', 'C\'è il Wi-Fi?', 'Taormina, 15 agosto',
              '1) Messaggio in segreteria: "Buongiorno."', 'AFFITTASI BILOCALE IN CENTRO', 'ventitré 23 28 101 1861']:
        print(repr(s), '→', repr(to_speech(s)))
