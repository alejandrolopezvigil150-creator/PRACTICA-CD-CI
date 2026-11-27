# Práctica 4 · CI/CD con GitHub Actions

Aplicación Angular para registrar notas y calcular la media, con integración y despliegue continuos.

- **CI**: en cada pull request contra `main`: `npm ci`, tests con cobertura mínima (80 % sentencias, funciones y líneas; 70 % ramas) y `ng build`.
- **CD**: en cada push a `main` se repite la CI y se despliega en GitHub Pages.
- `main` está protegida: una PR no se puede fusionar si la CI falla.

**Web:** https://alejandrolopezvigil150-creator.github.io/PRACTICA-CD-CI/

Autor: Alejandro López Vigil · 2º DAW
