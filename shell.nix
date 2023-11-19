{pkgs}:
pkgs.mkShellNoCC {
  nativeBuildInputs = with pkgs; [
     alejandra
     bob
     nil
     go_1_21
     gopls
     gofumpt
     golangci-lint
     gotools
     git
  ];
}
