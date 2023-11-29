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
     nodejs-18_x
     nodejs-18_x.pkgs.pnpm
     nodejs-18_x.pkgs.typescript
     postgresql_13
     gcc
     protobuf
     golangci-lint
     cargo
     rustc
     rustfmt
     libiconv
     clippy
     pre-commit
  ];
}
