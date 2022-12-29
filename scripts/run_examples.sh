yarn workspace mathbox-react build

concurrently \
  --names "mathbox-react,examples" \
  --prefix-colors "cyan,magenta" \
  "yarn workspace mathbox-react build-watch" \
  "yarn workspace examples dev"