INPUT_FILE = "stars_raw.csv"
OUTPUT_FILE = "stars.csv"

MAXIMUM_MAGNITUDE = 6

COORDINATES_DECIMALS = 2
MAGNITUDE_DECIMALS = 2

with open(INPUT_FILE, 'r') as file:
    stars_raw = file.read()

counter = 0

with open("stars.csv", "w", encoding="utf-8") as f:
    f.write("dec_deg,ra_deg,mag")
    for line in stars_raw.split("\n"):
        line = line.strip()
        [_, _, _, dec, ra, _, _, _, _, _, _, _, _, _, _, mag, _, _, _] = line.split(",")
        (dec, ra, mag) = (round(float(dec), COORDINATES_DECIMALS), round(float(ra), COORDINATES_DECIMALS), round(float(mag), MAGNITUDE_DECIMALS))
        if mag > MAXIMUM_MAGNITUDE:
            continue
        f.write(f"\n{dec},{ra},{mag}")
        counter += 1

print(f"INFO: Saved {counter} stars")