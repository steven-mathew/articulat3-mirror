{
  inputs = {
   # nixpkgs.url = "github:NixOS/nixpkgs/ea4c80b39be4c09702b0cb3b42eab59e2ba4f24b";
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = {
    self,
    flake-utils,
    nixpkgs,
    ...
  }:
    flake-utils.lib.eachDefaultSystem (
      system:
      let
        pkgs = import nixpkgs {inherit system;};
      in {
        devShells.default = pkgs.callPackage ./shell.nix {};
        packages.articulate = pkgs.callPackage ./package.nix {};
      }
    );
}
