# Stack Recipe: Python ML / Data Scripts

> Use the `_empty` preset, then follow this recipe for Python ML projects, data pipelines, and research scripts.

## When to use this

- Machine learning experiments and models
- Data processing pipelines
- Research notebooks
- API integrations in Python

## Setup procedure

### 1. Initialize with uv (preferred) or Poetry

```bash
# uv (faster, modern)
uv init .
uv python pin 3.11

# or Poetry
poetry init
poetry env use 3.11
```

### 2. Core dependencies

```bash
# Data/ML
uv add numpy pandas scikit-learn

# Validation
uv add pydantic

# Logging
uv add structlog

# HTTP
uv add httpx

# CLI (if needed)
uv add typer
```

### 3. Dev dependencies

```bash
uv add --dev pytest pytest-asyncio mypy ruff
```

### 4. Config files

`ruff.toml`:
```toml
line-length = 100
target-version = "py311"

[lint]
select = ["E", "F", "I", "N", "UP", "B", "SIM"]
ignore = ["E501"]

[format]
quote-style = "double"
```

`mypy.ini`:
```ini
[mypy]
python_version = 3.11
strict = true
ignore_missing_imports = true
```

### 5. Project structure (Tier 2)

```
src/
  [package_name]/
    __init__.py
    config.py       # Pydantic settings
    logger.py       # structlog setup
    [domain]/
tests/
notebooks/          # exploration only — production logic goes in src/
data/               # gitignored
.env.example
pyproject.toml
```

### 6. Useful scripts in pyproject.toml

```toml
[tool.pytest.ini_options]
testpaths = ["tests"]
asyncio_mode = "auto"

[tool.mypy]
strict = true
```

## Verification chain

```bash
uv sync
mypy src/
ruff check src/ tests/
pytest
```

## Key gotchas for CLAUDE.md

- Use `structlog` not `logging` for structured output
- Pydantic v2 has breaking changes from v1 — check migration guide if upgrading
- Notebooks are for exploration only. Extract reusable logic to `src/` modules
- `uv run python` to run with the managed virtualenv
