# Mathbox React

React bindings for [Mathbox](https://github.com/unconed/mathbox).

## Development

The project uses [Yarn](https://yarnpkg.com/getting-started/install) and includes two [Yarn Workspaces](https://yarnpkg.com/features/workspaces):

- [mathbox-react](./mathbox-react/) The actual package code, pbulished to NPM
- [examples](./example/) Examples using `mathbox-react`.

See individual `package.json` files for available commands. In general, commands should be run via `yarn`, not `npm`. E.g., `yarn install` or `yarn lint`.

## Releasing

Releases are automated with [semantic-release](https://semantic-release.gitbook.io/). The published version and changelog are derived from the [Conventional Commit](https://www.conventionalcommits.org/) titles of the pull requests merged since the previous release (each PR is squash-merged, so its title becomes the commit message; the `Lint PR` check enforces the format).

Which commit types cut a release:

| Type | Release |
| --- | --- |
| `feat:` | minor |
| `fix:`, `perf:`, `refactor:`, `revert:`, `build:` | patch |
| `feat!:` / `BREAKING CHANGE:` | major |
| `docs:`, `test:`, `ci:`, `style:`, `chore:` | none |

Dependency updates follow the same rules: [Renovate](https://docs.renovatebot.com/) is configured for semantic commits, so bumps to runtime `dependencies` are titled `fix(deps):` (releasing a patch) while dev/tooling bumps are `chore(deps):` (no release).

To publish, trigger the **Releases (Semantic & Pre-release)** workflow from the Actions tab (`workflow_dispatch`):

- `semantic-release` — cut a real release from `main` (publishes to npm + creates the GitHub release).
- `pre-release` — publish a throwaway `0.0.0-<sha>` version under the `preview` npm tag from any branch, for testing before merge.
