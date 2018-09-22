from subprocess import call


def eject_files(files):
    for f in files:
        call("mv ./{} ../{}.backup".format(f, f), shell=True)


def restore_files(files):
    for f in files:
        call("mv ../{}.backup ./{}".format(f, f), shell=True)


def find_and_replace(replacements):
    for r in replacements:
        call("zsh -c \"sed -i '' -- 's/{}/{}/g' **/*(D.)\"".format(r[0], r[1]),
             shell=True)


if __name__ == '__main__':
    eject_files(['.git', 'rename.py'])

    name = 'hackathon'
    find_and_replace([
        ('notechainwal', "{}_wallet".format(name)),
        ('notechain_wallet', "{}_wallet".format(name)),
        ('notechainacc', name),
        ('notechain', name),
        ('NoteChain', name),
        ('noteChain', name)
    ])
    call("cd eosio_docker/contracts && mv notechain {}".format(name),
         shell=True)
    call("cd eosio_docker/contracts/{} && mv notechain.cpp {}.cpp".format(name, name),
         shell=True)

    restore_files(['.git', 'rename.py'])
