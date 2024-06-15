#!/bin/bash
cd /home/edward

# >>> conda initialize >>>
# !! Contents within this block are managed by 'conda init' !!
__conda_setup="$('/home/edward/miniconda3/bin/conda' 'shell.bash' 'hook' 2> /dev/null)"
if [ $? -eq 0 ]; then
    eval "$__conda_setup"
else
    if [ -f "/home/edward/miniconda3/etc/profile.d/conda.sh" ]; then
        . "/home/edward/miniconda3/etc/profile.d/conda.sh"
    else
        export PATH="/home/edward/miniconda3/bin:$PATH"
    fi
fi
unset __conda_setup
# <<< conda initialize <<<

conda activate discord_quote
python3 /home/edward/code/quotes/discord-status/change_status.py