$target = "c:\college\SEM\Protfolio project\public\icons"
if (-Not (Test-Path $target)) {
    New-Item -ItemType Directory -Force -Path $target
}
Copy-Item "c:\college\SEM\Protfolio project\icons\*" -Destination $target -Recurse -Force

$icons = @{
    "React.svg" = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg"
    "Node.svg" = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg"
    "Express.svg" = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg"
    "Python.svg" = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg"
    "TensorFlow.svg" = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tensorflow/tensorflow-original.svg"
    "NumPy.svg" = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/numpy/numpy-original.svg"
    "Matplotlib.svg" = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/matplotlib/matplotlib-original.svg"
    "SQL.svg" = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg"
}

foreach ($icon in $icons.GetEnumerator()) {
    try {
        Invoke-WebRequest -Uri $icon.Value -OutFile "$target\$($icon.Name)"
    } catch {
        Write-Host "Failed to download $($icon.Name): $_"
    }
}
Write-Host "Done"
