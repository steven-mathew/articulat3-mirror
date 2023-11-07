{
  buildBazelPackage,
  lib,
  stdenv,
  pkgs,
}:
buildBazelPackage {
  name = "articulate";

  bazel = pkgs.bazel_6;
  bazelTargets = ["//cmd/articulate:articulate"];

  nativeBuildInputs = with pkgs; [nix go];
  buildInputs = with pkgs; [cacert];
  buildAttrs = {
    installPhase = ''
      install -Dm755 bazel-bin/cmd/articulate/articulate_/articulate $out/bin/articulate
    '';
  };

  src = pkgs.nix-gitignore.gitignoreSource [] (lib.cleanSource ./.);
  fetchAttrs.sha256 = {
    x86_64-linux = "sha256-8U3VvIzQmKUs4Hk5kjerRUNM+VULT7/1ZXGKXTSpkeo=";
    aarch64-darwin = "sha256-L4OCveyEBQ7jzwOVgtbnLa4ns+GVQPphme2x2fJ/DOk=";
  }.${stdenv.hostPlatform.system} or (throw "unsupported system ${stdenv.hostPlatform.system}");
}
