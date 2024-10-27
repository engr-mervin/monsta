//Refactor query string of items, remove boardid and groupid from parameters - OK
//Add include parameter to request options, include fields etc
//Add boards of workspace query - OK
//Add subitems query
//Add method (get item by value) in Group - OK
//Pass client itself instead of client options in classes - NA
//Add options to include some columns in the query

//Because we treat item and subitems differently( with diff classes)
//There's a small issue when trying to use getItems and passing in subitem id.
//The subitems field will be empty and the class instance is item instead of subitems

//ADD UTILS TO CONVERT MONDAY MGROUP TO GROUP etc and REFACTOR

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
  getRecordsByGroupName: YES,
  removeRecord:,
  archiveRecord:,
  getValueByColumnId: ,
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