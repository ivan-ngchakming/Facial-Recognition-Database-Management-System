# -*- mode: python ; coding: utf-8 -*-

from PyInstaller.building.api import PYZ, EXE
from PyInstaller.building.build_main import Analysis
from PyInstaller.building.datastruct import TOC


block_cipher = None

binaries = [
    ('./assets/models/antelopev2/1k3d68.onnx',
     './assets/models/antelopev2'),
    ('./assets/models/antelopev2/2d106det.onnx',
     './assets/models/antelopev2'),
    ('./assets/models/antelopev2/genderage.onnx',
     './assets/models/antelopev2'),
    ('./assets/models/antelopev2/glintr100.onnx',
     './assets/models/antelopev2'),
    ('./assets/models/antelopev2/scrfd_10g_bnkps.onnx',
     './assets/models/antelopev2'),
]

a = Analysis(
	['wsgi.py'],
	binaries=binaries,
	datas=[
		('build/', 'build/'),
	],
    hiddenimports=[],
    hookspath=[],
    hooksconfig={},
    runtime_hooks=[],
    excludes=[],
    win_no_prefer_redirects=False,
    win_private_assemblies=False,
    cipher=block_cipher,
    noarchive=False
)


a.binaries += TOC([
    (
        "onnxruntime.capi.onnxruntime_providers_shared",
        "./assets/onnxruntime_providers_shared.dll",
        "EXTENSION"
    ),
])


pyz = PYZ(
	a.pure,
	a.zipped_data,
    cipher=block_cipher
)

exe = EXE(
	pyz,
	a.scripts,
	a.zipfiles,
	a.binaries,
	a.datas,
	[],
	name='FRDMS',
	debug=False,
	bootloader_ignore_signals=False,
	strip=False,
	upx=True,
	console=True,
	disable_windowed_traceback=False,
	target_arch=None,
	codesign_identity=None,
	entitlements_file=None,
	icon='build/favicon.ico'
)
