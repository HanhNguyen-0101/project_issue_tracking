export const priorityIcon = (priorityId) => {
  switch (priorityId) {
    case 1:
      return <i className="text-danger fa fa-angle-double-up"></i>;
    case 2:
      return <i className="text-warning fa fa-equals"></i>;
    case 3:
      return <i className="text-primary fa fa-angle-down"></i>;
    case 4:
      return <i className="text-primary fa fa-angle-double-down"></i>;
    default:
      return "";
  }
};

export const taskTypeDetailIcon = (taskTypeDetailId) => {
  switch (taskTypeDetailId) {
    case 1:
      return <i className="text-danger fa fa-bug"></i>;
    case 2:
      return <i className="text-success fa fa-bookmark" />;
    default:
      return "";
  }
};
