const predefinedPages = [
  {
    loadPoint: '/',
    name: 'Home',
    desc: '首页',
    type: 'TEXT',
    children: ['ProjectList', 'GeneralConfigure'],
  },
  {
    loadPoint: '/',
    name: 'GeneralConfigure',
    desc: '通用配置',
    type: 'TEXT',
    children: ['CategoryNameAliases', 'ColAliases', 'PageConfiguration'],
  },
  {
    loadPoint: '/',
    name: 'PageConfiguration',
    desc: '页面导航',
    type: 'TEXT',
    children: ['']
  },
  {
    loadPoint: '/',
    name: 'CategoryNameAliases',
    desc: '科目别名',
    type: 'DATA',
  },
  {
    loadPoint: '/',
    name: 'ColAliases',
    desc: '表头别名',
    type: 'DATA',
    sheetName: 'COLUMN_NAME_ALIASES',
    tools: ['HeaderCreate'],
    colSpecs: {
      aliases: {desc: '表头别名', width: 12, cellType: 'Labels'},
    },
  },
  {
    loadPoint: '/',
    name: 'ProjectList',
    desc: '项目列表',
    type: 'DATA',
    data: 'PROJECT',
    children: ['PROJECT'],
  },
  {
    loadPoint: '/',
    name: 'PROJECT',
    contextualName: 'companyName',
    desc: '项目页',
    type: 'TEXT',
    children: ['Finance', 'Confirmation'],
  },
  {
    loadPoint: '/',
    name: 'Confirmation',
    desc: '函证管理',
    type: 'TEXT',
    children: ['ConfirmationManagement', 'ConfirmationTemplateManagement'],
  },
  {
    loadPoint: '/',
    name: 'ConfirmationManagement',
    desc: '函证状态管理',
    type: 'DATA',
  },
  {
    loadPoint: '/',
    name: 'ConfirmationTemplateManagement',
    desc: '询证函模版管理',
    type: 'DATA',
  },
  {
    loadPoint: '/',
    name: 'Finance',
    desc: '财务与报表管理',
    type: 'TEXT',
    sheetName: undefined,
    colSpecs: undefined,
    children: ['AccrualAnalysis', 'Balance', 'TrialBalance', 'FinancialPositionStatement', 'ProfitAndLoss', 'Cashflow', 'Equity', 'CashflowStatement'],
  },
  {
    loadPoint: '/',
    name: 'Balance',
    desc: '余额表',
    type: 'DATA',
  },
  {
    loadPoint: '/',
    name: 'FinancialPositionStatement',
    desc: '资产负债表',
    type: 'DATA',
  },
  {
    loadPoint: '/',
    name: 'AccrualAnalysis',
    desc: '发生额分析',
    type: 'DATA',
    data: 'ACCRUAL_ANALYSIS',
    isHidingManual: true,
  },
  {
    loadPoint: '/',
    name: 'TrialBalance',
    desc: '试算平衡表',
    type: 'MULTI-DATA',
    isHidingManual: true,
  },
  {
    loadPoint: '/',
    name: 'ProfitAndLoss',
    desc: '损益表',
    isHidingManual: true,
    type: 'MULTI-DATA',
    
  },
  {
    loadPoint: '/',
    name: 'Cashflow',
    desc: '现金流量表',
    type: 'MULTI-DATA',
    sheetName: 'CASHFLOW',
    isCascaded: true,
    isHidingManual: true,
    tools: [],
    colSpecs: {
      ccode_name: {desc: '条目名称', width: 4, isFilterable: true},
      value: {desc:'金额', width: 8, cellType:'Ref'},
      categorized: {desc:'列入报表项目', width: 4, cellType:'Ref'}
    },
  },
  {
    loadPoint: '/',
    name: 'Equity',
    desc: '所有权变动表',
    type: 'MULTI-DATA',
    isHidingManual: true,
  },
  {
    loadPoint: '/',
    name: 'CashflowStatement',
    desc: '现金流量表 (Obsoleted)',
    type: 'DATA',
    sheetName: 'CASHFLOW_WORKSHEET',
    isCascaded: true,
    tools: [],
    colSpecs: {
      desc: {desc: '题目', width: 5, isFilerable: true},
      ref:  {desc: '条目', width: 7, isFilterable: true, cellType:'Ref'},
    },
    rowEdit: {isSync:false, insertEnabled:true, removeEnabled: true},
  }
];

module.exports = {
  predefinedPages
}