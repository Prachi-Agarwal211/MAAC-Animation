$path = Join-Path (Get-Location) 'src\data\siteData.ts'
$c = Get-Content $path -Raw

# Find the Events nav link and add children array
$old = '{ label: "Events", href: "/events" }'
$new = '{ 
  label: "Events", 
  href: "/events",
  children: [
    { label: "Events at MAAC", href: "/events" },
    { label: "Annual Trips at MAAC", href: "/annual-trip" }
  ]
}'
$c = $c.Replace($old, $new)

Set-Content $path $c
Write-Host "✅ NavLinks updated: Events now has dropdown with Annual Trips"
