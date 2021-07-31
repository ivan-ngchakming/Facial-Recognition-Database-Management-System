from contextlib import contextmanager
import logging
import timeit


@contextmanager
def runtime(desc, logger=None, level=logging.DEBUG):
    start = timeit.default_timer()
    yield
    end = timeit.default_timer()

    output = f"{desc} finished in {end-start:.2f}s"
    if logger is None:
        print(output)
    else:
        logger.log(level, output)
