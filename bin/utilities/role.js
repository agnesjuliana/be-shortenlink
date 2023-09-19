function getCompetitionId(role) {
  let roleArr = role.split('_')

  let roleNumber;

  switch (roleArr[1]) {
    case 'msc':
      roleNumber = 1;
      break;
    case 'uastec':
      roleNumber = 2;
      break;
    case 'nbcc':
      roleNumber = 3;
      break;
    case 'mo':
      roleNumber = 4;
      break;
    default:
      roleNumber = null; // Default value if none of the cases match
      break;
  }

  return roleNumber;
}

function getIsAdmin(role) {
  let roleArr = role.split('_')

  if (roleArr[0] !== "admin") {
    return false
  }

  return true
}

function getIsSuperadmin(role) {

  if (role !== "superadmin") {
    return false
  }

  return true
}

module.exports = {getCompetitionId, getIsAdmin, getIsSuperadmin}