export function exp2level(exp) {
  if (exp >= 0 && exp < 10) {
    return '初来乍到';
  } else if (exp >= 10 && exp < 25) {
    return '健身萌新';
  } else if (exp >= 25 && exp < 50) {
    return '小有成就';
  } else {
    return '健身达人';
  }
}
