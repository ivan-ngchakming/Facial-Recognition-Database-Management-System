import logging


class CustomFormatter(logging.Formatter):
    """Logging Formatter to add colors and count warning / errors"""

    grey = "\x1b[38;21m"
    yellow = "\x1b[33;21m"
    red = "\x1b[31;21m"
    light_green = "\x1b[32;21m"
    blue = "\x1b[1;34;21m"
    green = "\x1b[36;21m"
    bold_red = "\x1b[31;1m"
    reset = "\x1b[0m"
    fformat = "\x1b[1;30;21m{asctime}<reset> | <color>{levelname: <8}<reset> | \x1b[32;21m{name}:{filename}:{funcName}:{lineno}<reset> - <color>{message}<reset>"

    FORMATS = {
        logging.DEBUG: fformat.replace("<reset>", reset).replace("<color>", blue),
        logging.INFO: fformat.replace("<reset>", reset).replace("<color>", reset),
        logging.WARNING: fformat.replace("<reset>", reset).replace("<color>", yellow),
        logging.ERROR: fformat.replace("<reset>", reset).replace("<color>", red),
        logging.CRITICAL: fformat.replace("<reset>", reset).replace(
            "<color>", bold_red
        ),
    }

    def format(self, record):
        log_fmt = self.FORMATS.get(record.levelno)
        formatter = logging.Formatter(log_fmt, style="{")
        return formatter.format(record)


def get_console_handler():
    handler = logging.StreamHandler()
    handler.setFormatter(CustomFormatter())
    return handler


def get_all_loggers():
    return [logging.getLogger(name) for name in logging.root.manager.loggerDict]
