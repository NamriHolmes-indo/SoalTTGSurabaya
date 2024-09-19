from itertools import permutations

def cari_hasil(sumber, target):
    def evaluasi_ekspresi(expr):
        try:
            return eval(expr)
        except ZeroDivisionError:
            return None

    def bantu(angka, ekspresi):
        if len(angka) == 1:
            if evaluasi_ekspresi(ekspresi) == target:
                return ekspresi
            return None
        for i in range(len(angka)):
            sisa = angka[:i] + angka[i+1:]
            for op in ['+', '-', '*']:
                ekspresi_baru = f'({ekspresi} {op} {angka[i]})'
                hasil = bantu(sisa, ekspresi_baru)
                if hasil:
                    return hasil
        return None

    for perm in permutations(sumber):
        hasil = bantu(list(perm), str(perm[0]))
        if hasil:
            return hapus_kurung_terluar(hasil)
    return None

def hapus_kurung_terluar(ekspresi):
    while len(ekspresi) > 1 and ekspresi[0] == '(' and ekspresi[-1] == ')':
        ekspresi = ekspresi[1:-1]
    return ekspresi.strip()

angka = [1, 4, 5, 6]
target = 16
print("Target: ", target, "Hasil: ",cari_hasil(angka, target))

target = 18
print("Target: ", target, "Hasil: ",cari_hasil(angka, target))

target = 50
print("Target: ", target, "Hasil: ",cari_hasil(angka, target))

angka = [1, 4, 21, 36]
target = 16
print("Target: ", target, "Hasil: ",cari_hasil(angka, target))

target = 18
print("Target: ", target, "Hasil: ",cari_hasil(angka, target))

target = 50
print("Target: ", target, "Hasil: ",cari_hasil(angka, target))