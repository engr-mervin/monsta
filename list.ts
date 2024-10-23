//Refactor query string of items, remove boardid and groupid from parameters
//Add include parameter to request options, include fields etc
//Add boards of workspace query
//Add subitems query
//Add method (get item by value) in Group
//Pass client itself instead of client options in classes

/**
  addColumnToBoard: NO,
  removeColumnFromBoard: NO,
  getRecordDetails: YES,
  getSubItemsRecordDetails: NO,
  getSubItemBoardIdByBoardId: NO,
  createRecord: NO,
  createSubItemRecord: NO,
  updateColumnMultipleValues: NO,
  updateRecordField: NO,
  updateSimpleValueField: NO,
  uploadFileToMondayColumn: NO,
  getRecordsByCompareColumnIdAndValue: YES,
  getRecordsByCompareColumnIdAndMultipleValues: YES,
  getRecordsByGroupName: ,
  removeRecord:,
  archiveRecord:,
  getValueByColumnId:,
  getValueByColumnTitle:,
  getValueObjByColumnId:,
  getValueByColumnIdAndType:,
  getConnectedBoardId:,
  isCheckboxChecked: false),
  updateCampaignStatus:,
  getRelevantValueByType, 
  getKeyByValue,
  getKeyValueByValue:,
  isColumnInRecord:,
  getGroupColumnIds:,
  getStatusColumnLabels:,
  
  //boards
  getBoardDetails:,
  getBoardsByWorkSpace:, 
  updateBoardDescription:,
  getBoardsColumns:,

  //groups
  createGroup:,
  getBoardGroups:,
  getGroupDetailsByName:,
  deleteGroup:,
  duplicateGroup:,
  getGroupById:,
  // get activity log 
  getActivityByField:,

  // get user details
  getUserDetails:,

  // upload on S3 based of pulseId
  uploadFilesToAWS:,
  uploadSingleToAWS:,
  createInvalidation:,

  //copy file on CDN
  duplicateFileOnAWS: false),
  isFileExistsInAWS:,

  //get audit data by boards ids
  getAuditData:,

  //get images deep details.
  getAssetsDetails: []),

  //add a comment on task.
  createTaskComment:,
  addCommentAndChangeStatus:,

  // infrawizard 
  getFoldersFromWorkspace:,
  createFolderInWorkspace:,
  moveFolderToParent:,
  duplicateBoard:,
  duplicateRecord:,
  moveItemToGroup:,
  createStatusOrDropDownColumn:,
  //common
  dateSubtractDays: ,
  validateRequest:,
  isStringAnObj:,
  isObjEmpty:,
  getDateTimeObj:,
  writeToMonitorBoard:,
  getImageUploadConfig:,
  getInfraWizardConfig:,
  getValueById:, 
  apiCallToMonday,
  cleanHTMLforMonday
  */