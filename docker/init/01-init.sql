-- 開発用データベース初期化スクリプト
-- このファイルはPostgreSQLコンテナの初回起動時に実行されます

-- 既にデータベースが存在する場合はスキップ
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_database WHERE datname = 'nextjs_graphql_dev') THEN
        CREATE DATABASE nextjs_graphql_dev;
    END IF;
END
$$;

-- 開発用のロールを作成（必要に応じて）
-- CREATE ROLE dev_user WITH LOGIN PASSWORD 'dev_password';
-- GRANT ALL PRIVILEGES ON DATABASE nextjs_graphql_dev TO dev_user;