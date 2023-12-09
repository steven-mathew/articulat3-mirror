unset -v username
unset -v server

ssh_key_path=$HOME/.ssh/id_rsa.pub

while getopts u:s:t:p:f: flag
do
    case "${flag}" in
        u) username=${OPTARG};;
        s) server=${OPTARG};;
        t) temporal_server_host_port=${OPTARG};;
        p) port="${OPTARG:-22}";;
        f) fqdn="${OPTARG}";;
    esac
done

if [ -z "$username" ] || [ -z "$server" ] || [ -z "$temporal_server_host_port" ]; then
        echo 'Missing -u or -s or -e' >&2
        exit 1
fi

cleanup() {
  echo
  echo "Shutting down services"
  ssh -p $port $username@$server "pkill 'main' 2>/dev/null"
  wait
}

trap cleanup EXIT

ssh -p $port $username@$server "USERNAME=${username} TEMPORAL_SERVER_HOST_PORT=${temporal_server_host_port} SERVER_FQDN=${fqdn} bash -s" < worker.sh
