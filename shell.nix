{pkgs}:
pkgs.mkShellNoCC {
  nativeBuildInputs = with pkgs; [
     alejandra 
     bob
     nil
     gopls
     git
  ];
}
