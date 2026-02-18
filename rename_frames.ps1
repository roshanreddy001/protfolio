
$dir = "c:\college\SEM\Protfolio project\public\frames_optimized"
$files = Get-ChildItem -Path $dir -Filter "frame_*.png" | Sort-Object { [int]($_.Name -replace '\D+(\d+).*', '$1') }

$counter = 0
foreach ($file in $files) {
    $newName = "frame_{0:D4}.png" -f $counter
    $newPath = Join-Path $dir $newName
    if ($file.Name -ne $newName) {
        Rename-Item -Path $file.FullName -NewName $newName
    }
    $counter++
}
Write-Host "Renamed $counter files."
