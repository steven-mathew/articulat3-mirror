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
     postgresql_13
     gcc
     protobuf
     go_1_21
     golangci-lint
     nodejs-18_x
     nodejs-18_x.pkgs.pnpm
     nodejs-18_x.pkgs.typescript
     cargo
     rustc
     rustfmt
     libiconv
     clippy
     pre-commit
  ];
}
