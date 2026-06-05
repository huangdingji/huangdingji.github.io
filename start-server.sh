#!/bin/bash
# 跨境网站本地预览服务器
# 固定端口 8765, 服务目录: 跨境网站_Codex/

PORT=8765
DIR="$(cd "$(dirname "$0")" && pwd)"
LOG="/tmp/qzjy-server.log"
PID_FILE="/tmp/qzjy-server.pid"

# 杀掉占用端口的旧进程
if lsof -ti :$PORT >/dev/null 2>&1; then
  echo "⚠ 端口 $PORT 已被占用, 杀掉旧进程..."
  lsof -ti :$PORT | xargs kill -9 2>/dev/null
fi

# 杀掉之前 PID 文件记录的进程
if [ -f "$PID_FILE" ]; then
  OLD_PID=$(cat "$PID_FILE")
  if kill -0 "$OLD_PID" 2>/dev/null; then
    echo "⚠ 杀掉之前的服务器 (PID $OLD_PID)..."
    kill -9 "$OLD_PID" 2>/dev/null
  fi
  rm -f "$PID_FILE"
fi

# 启动新服务器
cd "$DIR" || exit 1
nohup python3 -m http.server $PORT > "$LOG" 2>&1 &
SERVER_PID=$!
echo $SERVER_PID > "$PID_FILE"

# 等 1 秒确认启动
sleep 1
if kill -0 "$SERVER_PID" 2>/dev/null; then
  echo "✓ 服务器已启动"
  echo "  URL:    http://localhost:$PORT/"
  echo "  目录:   $DIR"
  echo "  PID:    $SERVER_PID (已写入 $PID_FILE)"
  echo "  日志:   $LOG"
  echo ""
  echo "常用入口:"
  echo "  首页:        http://localhost:$PORT/"
  echo "  India 页面:  http://localhost:$PORT/markets/india.html"
  echo "  Saudi 页面:  http://localhost:$PORT/markets/saudi-arabia.html"
  echo ""
  echo "停止: kill $SERVER_PID  或  ./start-server.sh (会先杀掉旧进程)"
else
  echo "✗ 启动失败, 查看日志: $LOG"
  cat "$LOG"
  exit 1
fi
