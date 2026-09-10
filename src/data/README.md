# Curated data layer

Every build the app recommends is assembled from these files. Nothing is fetched
from a live API. See `ProjectInstructions.md` (repo root, git-ignored) for the
reasoning behind this approach.

Update cadence: refresh the shortlist and tier assignments by hand whenever a
major CPU/GPU generation launches.

## Files and shapes

### `cpus.json` — array of CPU objects
```
{
  "id": "amd-ryzen-7-7800x3d",
  "name": "AMD Ryzen 7 7800X3D",
  "socket": "AM5",
  "tdpW": 120,
  "imageUrl": "",          // manufacturer press-kit image, or "" to link out
  "productUrl": ""         // retailer / PCPartPicker page
}
```

### `gpus.json` — array of GPU objects
```
{
  "id": "nvidia-rtx-4070-super",
  "name": "NVIDIA GeForce RTX 4070 SUPER",
  "vramGb": 12,
  "recommendedPsuW": 650,
  "lengthMm": 305,
  "imageUrl": "",
  "productUrl": ""
}
```

### `parts.json` — object keyed by category
`motherboards`, `memory`, `storage`, `powerSupplies`, `cases`. Each entry carries
the fields needed for compatibility checks (socket, form factor, RAM type and
slots, wattage, max GPU length) plus `id`, `name`, `imageUrl`, `productUrl`.

### `build-tiers.json` — array of tier objects
```
{
  "id": "1200-1440p",
  "budgetUsd": 1200,
  "useCase": "1440p",       // "esports-1080p" | "1440p" | "4k"
  "builds": [
    {
      "label": "Balanced 1440p",
      "parts": {
        "cpu": "amd-ryzen-5-7600",
        "gpu": "nvidia-rtx-4070-super",
        "motherboard": "...",
        "memory": "...",
        "storage": "...",
        "powerSupply": "...",
        "case": "..."
      }
    }
  ]
}
```

### `fps-table.json` — array of benchmark rows
```
{
  "gpuId": "nvidia-rtx-4070-super",
  "game": "Cyberpunk 2077",
  "resolution": "1440p",
  "preset": "High",
  "avgFps": 96
}
```
Games not listed are estimated with a scaling formula against a reference title.

### `reference-prices.json` — object mapping part id to price
```
{ "amd-ryzen-7-7800x3d": { "usd": 349, "updated": "2026-09-01" } }
```
