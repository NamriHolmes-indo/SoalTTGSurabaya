def hayo_mana_angkanya(angka):
    arr_set = set(angka)
    min_num = min(angka)
    max_num = max(angka)
    missing_numbers = [num for num in range(min_num, max_num + 1) if num not in arr_set]
    return missing_numbers

masukan = [1028, 1024, 1025, 1039, 1026]
cari_angka = hayo_mana_angkanya(masukan)
print("Angka yang hilang:", ', '.join(map(str, cari_angka)))

