# 1

- getPriority declared inside component
    - Re-created on every render → minor CPU waste.
    - Fix: Move outside component; make type-safe.

- Filter logic in sortedBalances
    - Uses undefined variable (lhsPriority) and confusing nested conditions → runtime bug, unclear logic.
    - Fix: Correct variable names; filter only positive amounts with valid priority.

- Sort comparator
    - Does not handle equal priorities → returns undefined, unstable sort.
    - Fix: Use numeric subtraction (getPriority(rhs) - getPriority(lhs)) or return 0 if equal.

- formattedBalances is unused
    - Wasteful computation every render.
    - Fix: Remove or integrate into rendering.

- Rows key uses index
    - React keys should be stable → prevents unnecessary remounts.
    - Fix: Use ${currency}-${blockchain} as key.

- useMemo dependencies include prices unnecessarily
    - Triggers recalculation even if balances didn’t change.
    - Fix: Only include actual dependencies.

- Inline toFixed() in render
    - Computed every render → minor performance hit.
    - Fix: Pre-compute in memo or helper function.

- any type in getPriority
    - Loses type safety → TypeScript warnings.
    - Fix: Use string or union of allowed blockchains.

- Large component doing multiple things
    - Handles filtering, sorting, formatting, and rendering → harder to maintain.
    - Fix: Extract helper functions or custom hooks.                                |