#!/bin/bash

unset -v username
unset -v server
unset -v github_email

ssh_key_path=$HOME/.ssh/id_rsa.pub

while getopts u:s:e: flag
do
    case "${flag}" in
        u) username=${OPTARG};;
        s) server=${OPTARG};;
        e) github_email=${OPTARG};;
    esac
done

if [ -z "$username" ] || [ -z "$server" ] || [ -z "$github_email" ]; then
        echo 'Missing -u or -s or -e' >&2
        exit 1
fi

echo "Adding $server fingerprint..."
ssh-keyscan -H $server >> ~/.ssh/known_hosts

echo "Copying SSH key to $server..."
ssh-copy-id -i $ssh_key_path -p 2233 $username@$server

echo "Creating new SSH key on $username@$server..."
ssh -p 2233 $username@$server "ssh-keygen -t rsa -b 4096 -P '' -C '${github_email}'"

echo "Getting public SSH key on $username@$server..."
ssh -p 2233 $username@$server "cat ~/.ssh/id_rsa.pub"

echo "Add this SSH public key to your account on GitHub."
