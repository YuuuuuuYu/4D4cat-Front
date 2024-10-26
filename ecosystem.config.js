module.exports = {
    apps: [
      {
        name: "4d4cat",
        script: "src/app.ts",                      // 엔트리 파일
        watch: ["src", "public"],                  // 감시할 디렉토리 지정
        ignore_watch: ["node_modules"],            // 감시에서 제외할 디렉토리
        exec_mode: "fork",                         // 프로세스 실행 모드
        interpreter: "node",                       // 일반 Node.js로 실행
        interpreter_args: "-r ts-node/register -r tsconfig-paths/register", // ts-node와 tsconfig-paths 등록
        watch_options: {
          followSymlinks: false                    // 심볼릭 링크는 기본적으로 감시하지 않음
        },
        env: {
          NODE_ENV: "development"                  // 개발 환경 설정
        },
        env_production: {
          NODE_ENV: "production"                   // 운영 환경 설정
        }
      }
    ]
  };
  