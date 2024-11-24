#!/bin/bash

set -e

option=$1

SOURCE=${BASH_SOURCE[0]}

while [ -h "$SOURCE" ]; do # resolve $SOURCE until the file is no longer a symlink
  DIR="$(cd -P "$(dirname "$SOURCE")" && pwd)"
  SOURCE="$(readlink "$SOURCE")"
  [[ $SOURCE != /* ]] && SOURCE="$DIR/$SOURCE" # if $SOURCE was a relative symlink, we need to resolve it relative to the path where the symlink file was located
done
DIR="$(cd -P "$(dirname "$SOURCE")" && pwd)"

source $DIR/../utils/list_input.sh
source $DIR/../utils/text_input.sh

if [ "$option" = "-l" ]; then
  # Do something
  # Check if the file exists
  if [ ! -f "$DIR/commit.txt" ]; then
    echo "No commit log"
    exit 1
  fi
  git_message=$(cat "$DIR/commit.txt")
else
  options=("feat" "fix" "chore" "doc" "style" "refactor" "perf" "revert" "test")
  list_input "Your commit type:" options type
  text_input "The scope your commit for:" scope
  text_input "Your commit message:" message
  if [ -n "$scope" ]; then
    git_message="${type}($scope): ${message}"
  else
    git_message="$type: $message"
  fi
fi

# Double check the commit message to confirm
printf "\n${magenta}${git_message} ${normal}${end}\n"
printf "${green}?${normal} Press enter to proceed ${gray}(Y/n) ${normal}${end}"
read -rp "" input
input="${input:-y}"

if [[ "$input" =~ ^(Y|y|yes|Yes|ok)$ ]]; then
  git commit -m "$git_message"
  echo "$git_message" >$DIR/commit.txt
else
  exit 1
fi
