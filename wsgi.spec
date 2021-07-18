# -*- mode: python ; coding: utf-8 -*-


block_cipher = None

face_models = [
    ('.\\face_recognition_models\\models\\dlib_face_recognition_resnet_model_v1.dat', './face_recognition_models/models'),
    ('.\\face_recognition_models\\models\\mmod_human_face_detector.dat', './face_recognition_models/models'),
    ('.\\face_recognition_models\\models\\shape_predictor_5_face_landmarks.dat', './face_recognition_models/models'),
    ('.\\face_recognition_models\\models\\shape_predictor_68_face_landmarks.dat', './face_recognition_models/models'),
]


a = Analysis(['wsgi.py'],
             pathex=['C:\\ComputerScience\\web\\facial-recognition'],
             binaries=face_models,
             datas=[('client/build/', 'client/build/')],
             hiddenimports=['scipy._lib.messagestream', 'scipy', 'scipy.signal', 'scipy.signal.bsplines', 'scipy.special', 'scipy.special._ufuncs_cxx',
                            'scipy.linalg.cython_blas',
                            'scipy.linalg.cython_lapack',
                            'scipy.integrate',
                            'scipy.integrate.quadrature',
                            'scipy.integrate.odepack',
                            'scipy.integrate._odepack',
                            'scipy.integrate.quadpack',
                            'scipy.integrate._quadpack',
                            'scipy.integrate._ode',
                            'scipy.integrate.vode',
                            'scipy.integrate._dop', 'scipy._lib', 'scipy._build_utils','scipy.__config__',
                            'scipy.integrate.lsoda', 'scipy.cluster', 'scipy.constants','scipy.fftpack','scipy.interpolate','scipy.io','scipy.linalg','scipy.misc','scipy.ndimage','scipy.odr','scipy.optimize','scipy.setup','scipy.sparse','scipy.spatial','scipy.special','scipy.stats','scipy.version'],
             hookspath=[],
             hooksconfig={},
             runtime_hooks=[],
             excludes=[],
             win_no_prefer_redirects=False,
             win_private_assemblies=False,
             cipher=block_cipher,
             noarchive=False)

# a.datas += Tree('./scipy-extra-dll', prefix=None)

pyz = PYZ(a.pure, a.zipped_data,
             cipher=block_cipher)

exe = EXE(pyz,
          a.scripts,
          a.binaries,
          a.zipfiles,
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
          entitlements_file=None , icon='client\\build\\favicon.ico')
