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
     protobuf
     nodejs-18_x
     nodejs-18_x.pkgs.pnpm
     nodejs-18_x.pkgs.typescript
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
