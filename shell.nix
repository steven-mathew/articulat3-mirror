{pkgs}:
pkgs.mkShellNoCC {
  nativeBuildInputs = with pkgs; [
     alejandra
     bob
     nil
     gopls
     gofumpt
     golangci-lint
     gotools
     git
  ];
}
