import os
import sys


def isfrozen():
    """Check if program is running from a Pyinstaller bundle."""
    if getattr(sys, "frozen", False) and hasattr(sys, "_MEIPASS"):
        return True
    else:
        return False


def frozen_basedir():
    """Get base directory of the executable when running in frozen mode."""
    if isfrozen():
        return os.path.dirname(sys.executable)
    else:
        raise Exception("Python is not running in frozen mode.")
