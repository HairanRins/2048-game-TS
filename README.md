# 2048 Game - TypeScript Modern Architecture

Un jeu 2048 implémenté avec les meilleures pratiques TypeScript modernes et une architecture propre.

## Démarrage rapide

### 1. Installation

```bash
npm install
```

### 2. Build

```bash
npm run build
```

### 3. Lancer le jeu

```bash
# Option 1: Serveur de développement
npx http-server public -p 8080

# Option 2: Ouvrir directement
# Ouvrir public/index.html dans votre navigateur
```

### 4. Jouer

Utilisez les **flèches directionnelles** pour déplacer les tuiles et atteindre 2048 !

---

## Architecture

### Structure des dossiers

```
src/
├── core/               # Logique métier principale
│   ├── game-engine.ts  # Moteur du jeu
│   └── event-emitter.ts # Gestion d'événements
├── services/           # Services métier
│   ├── tile-generator.service.ts
│   └── board-validator.service.ts
├── controllers/        # Contrôleurs
│   └── game-controller.ts
├── views/             # Rendu DOM
│   └── game-renderer.ts
├── types/             # Types et interfaces
│   ├── game.types.ts
│   └── interfaces.ts
├── utils/             # Utilitaires
│   └── board.utils.ts
├── constants/         # Constantes
│   └── game.constants.ts
└── index.ts          # Point d'entrée
```

### Patterns utilisés

- **MVC/MVVM**: Séparation claire entre Modèle (GameEngine), Vue (GameRenderer) et Contrôleur (GameController)
- **Observer Pattern**: Gestion des événements avec EventEmitter
- **Dependency Injection**: Injection des dépendances dans les constructeurs
- **SOLID Principles**: Chaque classe a une responsabilité unique
- **TypeScript Avancé**: Types stricts, readonly, interfaces avancées

## Fonctionnalités

### Architecture Modulaire

- **GameEngine**: Logique métier pure, sans dépendance DOM
- **GameRenderer**: Gestion du rendu DOM uniquement
- **GameController**: Gestion des entrées utilisateur
- **Services**: Validation, génération de tuiles

### TypeScript Avancé

- Types stricts avec `readonly` pour l'immuabilité
- Interfaces et types avancés
- Gestion des erreurs avec typage fort
- Pattern matching sur les événements

### Gestion d'état

- Pattern Observer pour les changements d'état
- Événements typés pour la communication
- Séparation claire des responsabilités

## Installation et Build

```bash
# Installation des dépendances
npm install

# Build TypeScript
npm run build

# Développement avec watch
npm run dev
```

## Comment jouer

1. **Build le projet**: `npm run build`
2. **Ouvrir** `public/index.html` dans un navigateur
3. **Utiliser les flèches directionnelles** pour déplacer les tuiles
4. **Fusionner les tuiles identiques** pour atteindre 2048

### Alternative rapide

```bash
npm run build && npx http-server public -p 8080
```

## Configuration TypeScript

Le projet utilise une configuration TypeScript stricte:

- `strict: true` pour la vérification stricte des types
- `noImplicitAny: true` pour éviter les types implicites
- `readonly` pour l'immuabilité des données
- Support des modules ESNext

## Concepts TypeScript démontrés

1. **Types avancés**: Union types, literal types, readonly
2. **Interfaces**: Contrats clairs entre composants
3. **Classes et héritage**: Architecture orientée objet
4. **Modules**: Organisation du code en modules
5. **Génériques**: EventEmitter réutilisable
6. **Immuabilité**: Protection des données avec readonly

---

C'est plus pour s'initier à TypeScript et pour le fun

![Capture d'écran du jeu](https://github.com/user-attachments/assets/ff616e23-de45-4891-af0c-d605a0ba253d)
