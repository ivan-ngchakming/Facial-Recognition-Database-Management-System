import os
import timeit

from flask.cli import AppGroup
import click


cli = AppGroup("build", short_help="Building the application")


@cli.command()
@click.option("-r", "--build-react", is_flag=True, default=False)
@click.option("-c", "--clean", is_flag=True, default=False)
def windows(build_react, clean):
    import PyInstaller.__main__

    start = timeit.default_timer()

    if build_react:
        os.system("cd client & yarn build")

    # Configure pyinstaller parameters
    configs = ["wsgi.spec"]
    if clean:
        configs.append("--clean")

    with open(configs[0], "r") as f:
        spec_content = f.read()

    # Build executable using pyinstaller.
    PyInstaller.__main__.run(configs)

    with open(f"dist/{configs[0]}", "w") as f:
        f.write(spec_content)

    print(f"Build finished in {timeit.default_timer()-start:.2f}s")
