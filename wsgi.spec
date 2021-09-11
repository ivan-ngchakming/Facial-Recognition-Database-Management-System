# -*- mode: python ; coding: utf-8 -*-

from PyInstaller.building.api import PYZ, EXE
from PyInstaller.building.build_main import Analysis
from PyInstaller.building.datastruct import TOC


block_cipher = None

binaries = [
    ('./face_recognition_models/models/antelopev2/1k3d68.onnx',
     './face_recognition_models/models/antelopev2'),
    ('./face_recognition_models/models/antelopev2/2d106det.onnx',
     './face_recognition_models/models/antelopev2'),
    ('./face_recognition_models/models/antelopev2/genderage.onnx',
     './face_recognition_models/models/antelopev2'),
    ('./face_recognition_models/models/antelopev2/glintr100.onnx',
     './face_recognition_models/models/antelopev2'),
    ('./face_recognition_models/models/antelopev2/scrfd_10g_bnkps.onnx',
     './face_recognition_models/models/antelopev2'),
]

a = Analysis(
	['wsgi.py'],
	pathex=['C:/ComputerScience/web/facial-recognition'],
	binaries=binaries,
	datas=[
		('client/build/', 'client/build/'),
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
        "C:/Users/ivanm/.virtualenvs/facial-recognition-6HdtIpUU/Lib/site-packages/onnxruntime/capi/onnxruntime_providers_shared.dll",
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
	icon='client/build/favicon.ico'
)
