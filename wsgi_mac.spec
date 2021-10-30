# -*- mode: python ; coding: utf-8 -*-

import PyInstaller.config
from PyInstaller.building.api import PYZ, EXE
from PyInstaller.building.build_main import Analysis


PyInstaller.config.CONF['workpath'] = "./pyinstaller_build"

block_cipher = None

datas = [
    ('build/', 'build/'),
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
    pathex=[],
	binaries=[],
	datas=datas,
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
	upx_exclude=[],
	runtime_tmpdir=None,
	console=True,
	disable_windowed_traceback=False,
	target_arch=None,
	codesign_identity=None,
	entitlements_file=None,
	icon='assets/appicons/macos/icns/FRDMS128x128.icns'
)
