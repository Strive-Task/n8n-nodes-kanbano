# Авторизация ноды

Эти инструкции дополняют корневой AGENTS.md и действуют для этого каталога.

- Прочитайте `.agents/credentials.md` перед правками.
- [KanbanoApi.credentials.ts](KanbanoApi.credentials.ts) поддерживает apiToken, accessToken и login; login использует cache и обновление токенов.
- Сверяйте snake_case token-поля backend и обработку срока JWT; не копируйте DTO admin.
- Не выводите credentials в логи, примеры и ошибки. Сохраняйте password-поля.
- Изменение авторизации проверяйте отдельно для трёх режимов и истечения токена; проверка сборки не заменяет эти сценарии.
