# Нода Kanbano

Эти инструкции дополняют корневой AGENTS.md и действуют для этого каталога.

- До изменения ноды прочитайте `.agents/nodes.md`, `.agents/properties.md` и `.agents/nodes-declarative.md` в корне репозитория.
- [Kanbano.node.ts](Kanbano.node.ts) собирает ресурсы из `resources/`; запросы задаются routing-описаниями.
- [helpers.ts](helpers.ts) содержит общие выражения: порядок × 1 000 000, список ID → CSV, флаг → '1'.
- Эти исходники импортирует генератор `kanbano-mcp/scripts/generate-operations.ts`; изменение формы выражения требует сверки генератора.
- После изменения операции проверьте URL, method, query/body, required и enum по backend; обновите MCP-каталог при затронутом контракте.
- Проверки кода: `npm run lint`, `npm run build`; release запускайте только по явной просьбе.
