import React, { createContext, useState, useContext, useEffect } from 'react';

const TranslationContext = createContext();

export function TranslationProvider({ children }) {
  const [selectedLanguage, setSelectedLanguage] = useState(() => {
    return localStorage.getItem('selectedLanguage') || 'en';
  });

  const translations = {
    en: {
      // Navigation & Branding
      rubiesThrift: 'RubiesThrift',
      savingSimple: 'Save. Share. Thrive',
      products: 'Products',
      marketplace: 'Marketplace',
      blog: 'Blog',
      about: 'About',
      contact: 'Contact',
      signIn: 'Sign In',
      signUp: 'Sign Up',
      getStarted: 'Get Started',
      
      // Home Page & Hero
      alternativeFinance: 'Alternative finance for underserved Africans',
      microCredit: 'We make access to micro-credit easy for SMEs and corporate workers at zero-interest. Become part of our community financing digital rotating savings and credit platform (ROSCA) to get started.',
      joinThriftApp: 'Join ThriftApp',
      becomeFinanciallyFree: 'Become financially free and included when you build credit through flexible savings such as rotating group savings and thrift contribution with collective investment.',
      
      // Features
      smartSavings: 'Smart Savings Solutions',
      communityDriven: 'Community Driven',
      secureTransparent: 'Secure & Transparent',
      smartSavingsDesc: 'Save flexibly with personalized goals and track your progress',
      communityDrivenDesc: 'Join thousands in rotating savings groups',
      secureTransparentDesc: 'Your money is secure and transactions are transparent',
      
      // Group Thrift
      groupThrift: 'Group Thrift',
      soloThrift: 'Solo Thrift',
      groupThriftDesc: 'Join rotating savings groups and build community wealth',
      soloThriftDesc: 'Personal savings at your own pace with full control',
      joinAjo: 'Join an Ajo',
      exploreGroups: 'Explore Available Groups',
      createGroup: 'Create a New Group',
      groupName: 'Group Name',
      groupDescription: 'Group Description',
      frequency: 'Contribution Frequency',
      amount: 'Amount',
      monthly: 'Monthly',
      weekly: 'Weekly',
      daily: 'Daily',
      biWeekly: 'Bi-weekly',
      members: 'Members',
      totalCollected: 'Total Collected',
      nextPayout: 'Next Payout',
      status: 'Status',
      active: 'Active',
      inactive: 'Inactive',
      joinGroup: 'Join Group',
      leaveGroup: 'Leave Group',
      
      // Savings
      personalSavings: 'Personal Savings',
      savingsGoals: 'Savings Goals',
      goalName: 'Goal Name',
      targetAmount: 'Target Amount',
      deadline: 'Deadline',
      currentAmount: 'Current Amount',
      progress: 'Progress',
      addGoal: 'Add Goal',
      addMoney: 'Add Money',
      withdrawFunds: 'Withdraw Funds',
      
      // Dashboard
      dashboard: 'Dashboard',
      welcome: 'Welcome',
      myGroups: 'My Groups',
      mySavings: 'My Savings',
      transactions: 'Transactions',
      profile: 'Profile',
      settings: 'Settings',
      logout: 'Logout',
      totalBalance: 'Total Balance',
      recentTransactions: 'Recent Transactions',
      
      // Transactions
      transactionHistory: 'Transaction History',
      transactionDate: 'Date',
      transactionDescription: 'Description',
      transactionAmount: 'Amount',
      transactionType: 'Type',
      deposit: 'Deposit',
      withdrawal: 'Withdrawal',
      transfer: 'Transfer',
      
      // Footer
      company: 'Company',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service',
      contactHeading: 'Contact',
      email: 'Email: contactrubiesthrift@gmail.com',
      phone: 'Phone: 09032217418',
      language: 'Language',
      current: 'Current',
      copyright: '© 2025 RubiesThrift — Savings Made Simple',
      
      // Blog
      insights: 'RubiesThrift Insights',
      insightsDesc: 'Expert tips on thrifting, financial wellness, and building wealth through smart saving',
      searchArticles: 'Search articles...',
      allArticles: 'All Articles',
      tipGuides: 'Tips & Guides',
      trends: 'Trends',
      financialTips: 'Financial Tips',
      featuredArticle: 'Featured Article',
      latestArticles: 'Latest Articles',
      readMore: 'Read More',
      noArticles: 'No articles match your search. Try a different keyword or category.',
      stayUpdated: 'Stay Updated',
      subscribe: 'Subscribe to our newsletter for the latest tips and updates',
      enterEmail: 'Enter your email',
      subscribeBtn: 'Subscribe',
      author: 'Author',
      publishedOn: 'Published on',
      readTime: 'min read',
      
      // Sign In / Sign Up
      welcomeBack: 'Welcome back to RubiesThrift. Sign in to your account.',
      phoneOrEmail: 'Phone or Email',
      password: 'Password',
      forgotPassword: 'Forgot your password?',
      resetIt: 'Reset it',
      dontHaveAccount: 'Don\'t have an account?',
      createOne: 'Create one',
      firstName: 'First Name',
      lastName: 'Last Name',
      userType: 'User Type',
      agreeTerms: 'I agree to the Terms of Service and Privacy Policy',
      
      // Marketplace
      shopProducts: 'Shop Products',
      cart: 'Cart',
      checkout: 'Checkout',
      addToCart: 'Add to Cart',
      removeFromCart: 'Remove from Cart',
      viewCart: 'View Cart',
      yourCart: 'Your Cart',
      subtotal: 'Subtotal',
      shipping: 'Shipping',
      total: 'Total',
      proceedToCheckout: 'Proceed to Checkout',
      
      // Support
      support: 'Support',
      contactUs: 'Contact Us',
      faq: 'Frequently Asked Questions',
      helpCenter: 'Help Center',
      message: 'Message',
      send: 'Send',
      
      // Common Actions
      save: 'Save',
      cancel: 'Cancel',
      delete: 'Delete',
      edit: 'Edit',
      create: 'Create',
      update: 'Update',
      updateGoal: 'Update Goal',
      exportCSV: 'Export CSV',
      exportGoals: 'Export Goals',
      quickAmounts: 'Quick amounts',
      darkMode: 'Dark Mode',
      lightMode: 'Light Mode',
      themeToggleDesc: 'Toggle site theme to dark or light',
      submit: 'Submit',
      loading: 'Loading...',
      error: 'Error',
      success: 'Success',
      warning: 'Warning',
      
      // Messages
      successfullySaved: 'Successfully saved!',
      deletedSuccessfully: 'Deleted successfully!',
      errorOccurred: 'An error occurred',
      pleaseFilAllFields: 'Please fill in all fields',
      invalidEmail: 'Invalid email address',
      passwordMismatch: 'Passwords do not match',
    },
    
    yo: {
      // Navigation & Branding
      rubiesThrift: 'RubiesThrift',
      savingSimple: 'Ifowosi. Pín. Yọkúrò',
      products: 'Awọn Ọrọ',
      marketplace: 'Ọja Ode',
      blog: 'Blog',
      about: 'Nipa wa',
      contact: 'Okunapo',
      signIn: 'Wọle',
      signUp: 'Forukọsilẹ',
      getStarted: 'Bẹrẹ Nisisiyi',
      
      // Home Page & Hero
      alternativeFinance: 'Ilana Owo Yiyalẹnu fun awọn Arika ti ko ni iranlọwọ',
      microCredit: 'A n se anfani si iyalẹnu owo kekere fun awọn SMEs ati awọn alabapin osikaka ni afo-aipin. Wọle sibẹ pẹlu awa ni agbaye ifowosi owo ti o fi idije kale (ROSCA) lati bẹrẹ.',
      joinThriftApp: 'Wọle si ThriftApp',
      becomeFinanciallyFree: 'Wa ni ọrọ owo ati iṣe iyalẹnu ni ito gbẹkẹlẹ ti ijinle bi ifowosi idije-ebe ati ifunrere agbaye.',
      
      // Features
      smartSavings: 'Awọn Otitọ Ifowosi',
      communityDriven: 'Ti Agbaye',
      secureTransparent: 'Aawo & Ifihan',
      smartSavingsDesc: 'Ifowosi yiyalẹnu pẹlu awọn ipe ti ara yin ati wo iyipada rẹ',
      communityDrivenDesc: 'Wọle si awọn ẹgbẹ ifowosi owo idije pẹlu ẹgbẹ',
      secureTransparentDesc: 'Owo rẹ wa ni aawo ati awọn isowo ni itan',
      
      // Group Thrift
      groupThrift: 'Ifowosi Agbaye',
      soloThrift: 'Ifowosi Ara Ẹni',
      groupThriftDesc: 'Wọle si awọn ẹgbẹ ifowosi owo idije ati kọ́ riṣẹ́ ije ara agbaye',
      soloThriftDesc: 'Ifowosi ara ẹni ni iyipada rẹ pẹlu iko iṣelọ',
      joinAjo: 'Wọle si Ajo',
      exploreGroups: 'Wo Awọn Ẹgbẹ ti O Wa Nisisiyi',
      createGroup: 'Ṣẹ Ẹgbẹ Tuntun',
      groupName: 'Oruko Ẹgbẹ',
      groupDescription: 'Apejuwe Ẹgbẹ',
      frequency: 'Igba Ifunrere',
      amount: 'Iye Owo',
      monthly: 'Osù kọọkan',
      weekly: 'Ose kọọkan',
      daily: 'Ojo kọọkan',
      biWeekly: 'Ose mejeeji',
      members: 'Awọn Ọmọ Ẹgbẹ',
      totalCollected: 'Lapapọ ti O Wa',
      nextPayout: 'Ẹdan ti Atọkọ',
      status: 'Ipo',
      active: 'Nise',
      inactive: 'Ko nise',
      joinGroup: 'Wọle si Ẹgbẹ',
      leaveGroup: 'Fi Ẹgbẹ Sile',
      
      // Savings
      personalSavings: 'Ifowosi Ara Ẹni',
      savingsGoals: 'Awọn Iṣẹ Ifowosi',
      goalName: 'Oruko Iṣẹ',
      targetAmount: 'Iye Iṣẹ',
      deadline: 'Akoko Ṣẹda',
      currentAmount: 'Iye Lọ́wọ́',
      progress: 'Iyipada',
      addGoal: 'Fi Iṣẹ Kun',
      addMoney: 'Fi Owo Kun',
      withdrawFunds: 'Gba Owo',
      
      // Dashboard
      dashboard: 'Agbaji Iṣẹ',
      welcome: 'Kaabo',
      myGroups: 'Awọn Ẹgbẹ Mi',
      mySavings: 'Awọn Ifowosi Mi',
      transactions: 'Awọn Isowo',
      profile: 'Profili',
      settings: 'Awọn Eto',
      logout: 'Jade',
      totalBalance: 'Lapapọ Owo',
      recentTransactions: 'Awọn Isowo Tuntun',
      
      // Transactions
      transactionHistory: 'Itan Isowo',
      transactionDate: 'Ojo',
      transactionDescription: 'Apejuwe',
      transactionAmount: 'Iye',
      transactionType: 'Iru',
      deposit: 'Ibi Ifunrere',
      withdrawal: 'Gbo',
      transfer: 'Gbigbe',
      
      // Footer
      company: 'Kamfani',
      privacy: 'Ibanisoro Asiri',
      terms: 'Idu Ilana',
      contactHeading: 'Okunapo',
      email: 'Imeli: contactrubiesthrift@gmail.com',
      phone: 'Foonu: 09032217418',
      language: 'Ede',
      current: 'Lọ́wọ́',
      copyright: '© 2025 RubiesThrift — Ifowosi Sisan',
      
      // Blog
      insights: 'Awọn Agbeyẹ RubiesThrift',
      insightsDesc: 'Awọn imọran iyalẹnu nipa ti ifowosi, ilana owo eni, ati eto ara ati ewa nipa ifowosi alagbara',
      searchArticles: 'Wa awọn ọrọ...',
      allArticles: 'Gbogbo Awọn Ọrọ',
      tipGuides: 'Awọn Iṣẹ ati Itọnisọna',
      trends: 'Awọn Ohun Tuntun',
      financialTips: 'Awọn Imọran Ow',
      featuredArticle: 'Ọrọ Pataki',
      latestArticles: 'Awọn Ọrọ Tuntun',
      readMore: 'Ka Diẹ Sii',
      noArticles: 'Ko si ọrọ ti o baramu ẹ sọ. Gbiyanju pẹlu ọrọ ti o yatọ tabi ẹka.',
      stayUpdated: 'Wo Oke',
      subscribe: 'Ṣe alabapin si ila ifẹ wa fun awọn iyalẹnu ati ẹ dá lọ́kan',
      enterEmail: 'Tẹ imeeli rẹ',
      subscribeBtn: 'Ṣe alabapin',
      author: 'Onkọwe',
      publishedOn: 'Ti a ṣe atẹjade ni',
      readTime: 'iṣejú ka',
      
      // Sign In / Sign Up
      welcomeBack: 'Kaabo pada si RubiesThrift. Wọle si akọọ rẹ.',
      phoneOrEmail: 'Foonu tabi Imeli',
      password: 'Ọfin Asiri',
      forgotPassword: 'Ẹ gbagbe ọfin asiri rẹ?',
      resetIt: 'Tu un naa di',
      dontHaveAccount: 'Ẹ ko ni akọọ?',
      createOne: 'Ṣẹ ọkan',
      firstName: 'Oruko Akọkọ',
      lastName: 'Oruko Ekeji',
      userType: 'Iru Olumulo',
      agreeTerms: 'Mo jẹ́ rọ́ pẹ̀lú Idu Ilana ati Ibanisoro Asiri',
      
      // Marketplace
      shopProducts: 'Rà Awọn Ọrọ',
      cart: 'Àpò',
      checkout: 'Owo',
      addToCart: 'Fi Sinu Àpò',
      removeFromCart: 'Mu Kuro Ninu Àpò',
      viewCart: 'Wo Àpò',
      yourCart: 'Àpò Rẹ',
      subtotal: 'Iye Kekere',
      shipping: 'Ifigba',
      total: 'Lapapọ',
      proceedToCheckout: 'Lo Sinu Owó',
      
      // Support
      support: 'Iranlọwọ',
      contactUs: 'Okunapo wa',
      faq: 'Awọn Ibeere Igbagbogbo',
      helpCenter: 'Aarin Iranlọwọ',
      message: 'Ifiranṣẹ',
      send: 'Firanṣẹ',
      
      // Common Actions
      save: 'Ifowosi',
      cancel: 'Fagile',
      delete: 'Mu Kuro',
      edit: 'Ṣe Atunso',
      create: 'Ṣẹ',
      update: 'Ṣe Atunwo',
      updateGoal: 'Imudojuiwọn Iṣẹ',
      exportCSV: 'Gba CSV',
      exportGoals: 'Gba Awọn Iṣẹ',
      quickAmounts: 'Iye Fọwọsẹ',
      darkMode: 'Ipo Dudu',
      lightMode: 'Ipo Imọlẹ',
      themeToggleDesc: 'Yi akori aaye pada si okunkun tabi ina',
      submit: 'Firanṣẹ',
      loading: 'A nlo...',
      error: 'Aṣiṣe',
      success: 'Iṣẹ',
      warning: 'Akesan',
      
      // Messages
      successfullySaved: 'Ifowosi dagba!',
      deletedSuccessfully: 'Mu Kuro dagba!',
      errorOccurred: 'Aṣiṣe kan wa',
      pleaseFilAllFields: 'Jọwọ kun gbogbo awọn aaye',
      invalidEmail: 'Imeeli ti ko tọ',
      passwordMismatch: 'Awọn ọfin asiri ko baramu',
    },
    
    ig: {
      // Navigation & Branding
      rubiesThrift: 'RubiesThrift',
      savingSimple: 'Nzakọ. Ker. Ebe',
      products: 'Ihe Ndị',
      marketplace: 'Ụlọ Ahịa',
      blog: 'Blog',
      about: 'Gbasara Anyị',
      contact: 'Ntụgharị Ozi',
      signIn: 'Banye',
      signUp: 'Debanye aha',
      getStarted: 'Bido Ugbu a',
      
      // Home Page & Hero
      alternativeFinance: 'Ihe ndị ọzọ maka ndị Afrịka na-enweghị enyemaka',
      microCredit: 'Anyị na-eme ka ịnweta ego mma dị mma maka ndị SMEs na ndị ọrụ ụlọ ọrụ na enweghị ego. Soro anyị na nchikota ego mma dijitalụ (ROSCA) iji malite.',
      joinThriftApp: 'Banye ThriftApp',
      becomeFinanciallyFree: 'Nweta ego na mbadịkwa mgbe ị na-akụ ego site na nchekwa ndị dị iche iche',
      
      // Features
      smartSavings: 'Nchekwa Ego Mma',
      communityDriven: 'Maka Nchikota',
      secureTransparent: 'Enwe Ihe & Ngosi Ezi',
      smartSavingsDesc: 'Nzakọ ego na ụzọ dị mkpa na ike ịlele ọganihu gị',
      communityDrivenDesc: 'Soro ọtụtụ ndị na nchikota nchekwa ego',
      secureTransparentDesc: 'Ego gị dị n\'ewu ike na mgbakwunye ụzọ dị azi',
      
      // Group Thrift
      groupThrift: 'Nchekwa Ego Nchikota',
      soloThrift: 'Nchekwa Ego Onye Ọzọ',
      groupThriftDesc: 'Soro nchikota nchekwa ego ma rikota ike nchikota',
      soloThriftDesc: 'Nchekwa ego nke onwe gị iche na ike mgbakwunye',
      joinAjo: 'Banye Ajo',
      exploreGroups: 'Lelee Nchikota Dị Adị',
      createGroup: 'Mepụta Nchikota Ọhụrụ',
      groupName: 'Aha Nchikota',
      groupDescription: 'Nkọwa Nchikota',
      frequency: 'Mgbe Imikpu',
      amount: 'Ego',
      monthly: 'Kwa onye moon',
      weekly: 'Kwa izu',
      daily: 'Kwa ụbọchị',
      biWeekly: 'Izu abuo',
      members: 'Ndị Otu',
      totalCollected: 'Lapapọ Wuzolu',
      nextPayout: 'Ọ na-achọ Nnọkọ',
      status: 'Ọnọdu',
      active: 'Nru Ọrụ',
      inactive: 'Agaghị Arụ Ọrụ',
      joinGroup: 'Banye Nchikota',
      leaveGroup: 'Hawa Nchikota',
      
      // Savings
      personalSavings: 'Nchekwa Ego Onye Ọzọ',
      savingsGoals: 'Ebumnuche Nchekwa Ego',
      goalName: 'Aha Ebumnuche',
      targetAmount: 'Ọnụ Ego Ebumnuche',
      deadline: 'Oge Mwụda',
      currentAmount: 'Ego Ugbu a',
      progress: 'Ọganihu',
      addGoal: 'Tinye Ebumnuche',
      addMoney: 'Tinye Ego',
      withdrawFunds: 'Budata Ego',
      
      // Dashboard
      dashboard: 'Ụlọ Ọrụ',
      welcome: 'Onwu Oriwu',
      myGroups: 'Nchikota M',
      mySavings: 'Nchekwa Ego M',
      transactions: 'Azụ Mụta',
      profile: 'Profaịlụ',
      settings: 'Ntọhapụ',
      logout: 'Pụọ',
      totalBalance: 'Lapapọ Ego',
      recentTransactions: 'Azụ Mụta Nke Nso',
      
      // Transactions
      transactionHistory: 'Ụka Azụ Mụta',
      transactionDate: 'Ụbọchị',
      transactionDescription: 'Nkọwa',
      transactionAmount: 'Ego',
      transactionType: 'Ụdị',
      deposit: 'Itinye Ego',
      withdrawal: 'Ibudata',
      transfer: 'Inyefe',
      
      // Footer
      company: 'Ụlọ Ọrụ',
      privacy: 'Nkwekọ Nzuzo',
      terms: 'Usoro Nkwenye',
      contactHeading: 'Ntụgharị Ozi',
      email: 'Ozi: contactrubiesthrift@gmail.com',
      phone: 'Tele: 09032217418',
      language: 'Asụsụ',
      current: 'Ọnụ Ugbu a',
      copyright: '© 2025 RubiesThrift — Eji Ego Edo',
      
      // Blog
      insights: 'Ihe Ọmụma RubiesThrift',
      insightsDesc: 'Nduzi ezi ezị maka nchekwa ego, njikwa ego onwe gị, ọnụ ọnụ maka ịnweta akụ site na nchekwa ego mma',
      searchArticles: 'Chọọ ihe ndị...',
      allArticles: 'Ihe Ndị Niile',
      tipGuides: 'Nduzi na Nkọwa',
      trends: 'Mmetụta',
      financialTips: 'Nduzi Ego',
      featuredArticle: 'Ihe Ndị Isi',
      latestArticles: 'Ihe Ndị Ohuru',
      readMore: 'Gụ Ihe Karị',
      noArticles: 'Enweghị ihe ndị dabara n\'ụmụ gị. Nwaa okwu ọzọ ma ọ bụ udi.',
      stayUpdated: 'Mebe Anya',
      subscribe: 'Jide ikpo okwu anyị maka nduzi na nkwupụta ọzọ',
      enterEmail: 'Tụnye emeili gị',
      subscribeBtn: 'Jide',
      author: 'Onye Edemede',
      publishedOn: 'Bipụtara na',
      readTime: 'nkeji gụ',
      
      // Sign In / Sign Up
      welcomeBack: 'Onwu Oriwu pada RubiesThrift. Banye akaụntụ gị.',
      phoneOrEmail: 'Telefonu ma ọ bụ Emeili',
      password: 'Paswọd',
      forgotPassword: 'Ị chefuru paswọd gị?',
      resetIt: 'Megharia ya',
      dontHaveAccount: 'Ị nwụla akaụntụ?',
      createOne: 'Mepụta otu',
      firstName: 'Aha Mbụ',
      lastName: 'Aha Ọkara',
      userType: 'Ụdị Onye Ọrụ',
      agreeTerms: 'Ekwuolim na Usoro Nkwenye na Nkwekọ Nzuzo',
      
      // Marketplace
      shopProducts: 'Zụ Ihe Ndị',
      cart: 'Akpa',
      checkout: 'Otu Nye Ego',
      addToCart: 'Tinye Na Akpa',
      removeFromCart: 'Wepu Site Na Akpa',
      viewCart: 'Lelee Akpa',
      yourCart: 'Akpa Gị',
      subtotal: 'Ụka Nta',
      shipping: 'Nzipu',
      total: 'Lapapọ',
      proceedToCheckout: 'Gaa Nye Ego',
      
      // Support
      support: 'Enyemaka',
      contactUs: 'Kpọtụrụ Anyị',
      faq: 'Ajụjụ A Ajụjụ',
      helpCenter: 'Ebe Enyemaka',
      message: 'Ụmụ Ozi',
      send: 'Ziga',
      
      // Common Actions
      save: 'Nzakọ',
      cancel: 'Kagbuo',
      delete: 'Hichapụ',
      edit: 'Emeza',
      create: 'Mepụta',
      update: 'Megharia',
      updateGoal: 'Megharia Ebumnuche',
      exportCSV: 'Export CSV',
      exportGoals: 'Export Ebumnuche',
      quickAmounts: 'Ntọala Ego',
      darkMode: 'Dark Mode',
      lightMode: 'Light Mode',
      themeToggleDesc: 'Gbanwee salon shafin zuwa duhu ko haske',
      submit: 'Ziga',
      loading: 'A na-alọta...',
      error: 'Njehie',
      success: 'Ihe Nkachasị',
      warning: 'Ịkwado',
      
      // Messages
      successfullySaved: 'Ezuo nke ọma!',
      deletedSuccessfully: 'Hichapụtara nke ọma!',
      errorOccurred: 'Njehie mere',
      pleaseFilAllFields: 'Jụọ mezie ogige niile',
      invalidEmail: 'Emeili ndị na-adịghị mma',
      passwordMismatch: 'Paswọd adịghị agakwa',
    },
    
    ha: {
      // Navigation & Branding
      rubiesThrift: 'RubiesThrift',
      savingSimple: 'Tanadin. Raba. Ci Gaba',
      products: 'Abubuwa',
      marketplace: 'Kasuwa',
      blog: 'Blog',
      about: 'Kan Game',
      contact: 'Mu Da Saƙo',
      signIn: 'Shiga',
      signUp: 'Yi Rajista',
      getStarted: 'Fara Jiya',
      
      // Home Page & Hero
      alternativeFinance: 'Madaidaicin kuɗi ga Africans marasa taimako',
      microCredit: 'Mun sauƙa daftar kuɗi kaɗai don SMEs da ƙaifin aiki cikin baƙi. Taba tare da muke a jamiyyar kuɗi dijital (ROSCA) don farawa.',
      joinThriftApp: 'Shiga ThriftApp',
      becomeFinanciallyFree: 'Sami kuɗi da jiya lokacin da kuke tara kuɗi ta hanyoyi iri-iri',
      
      // Features
      smartSavings: 'Tsarukan Kuɗi Masu Mahimmanci',
      communityDriven: 'Na Jamiyyar',
      secureTransparent: 'Aminci & Bayyana',
      smartSavingsDesc: 'Tara kuɗi ta ƙarŋa tare da bukatun ku da ka leɓa iyaka',
      communityDrivenDesc: 'Taba tare da jama\'a a jamiyyar tara kuɗi',
      secureTransparentDesc: 'Kuɗin ku yana cikin aminci da ma\'amaloli suna gida',
      
      // Group Thrift
      groupThrift: 'Tara Kuɗi Jamiyyar',
      soloThrift: 'Tara Kuɗi Kai',
      groupThriftDesc: 'Taba tare da jamiyyoyi na tara kuɗi da gina karfi jamiyyar',
      soloThriftDesc: 'Tara kuɗi na kai a ƙarŋa tare da jiya iko',
      joinAjo: 'Shiga Ajo',
      exploreGroups: 'Gida Jamiyyoyi Da Ke Akwai',
      createGroup: 'Ƙirƙira Jamiyyar Saba',
      groupName: 'Sunan Jamiyyar',
      groupDescription: 'Bayanin Jamiyyar',
      frequency: 'Lokacin Tara',
      amount: 'Kuɗi',
      monthly: 'Wata kowa',
      weekly: 'Makonni kowa',
      daily: 'Rana kowa',
      biWeekly: 'Makonni biyu',
      members: 'Membobi',
      totalCollected: 'Duka Tara',
      nextPayout: 'Ƙarvar Jiiya',
      status: 'Yanayin',
      active: 'Aiki',
      inactive: 'Ba Aiki',
      joinGroup: 'Shiga Jamiyyar',
      leaveGroup: 'Bari Jamiyyar',
      
      // Savings
      personalSavings: 'Tara Kuɗi Kai',
      savingsGoals: 'Bukatun Tara',
      goalName: 'Sunan Bukatun',
      targetAmount: 'Adadin Bukatun',
      deadline: 'Ƙarshe Lokaci',
      currentAmount: 'Kuɗi Jiya',
      progress: 'Iyakacin',
      addGoal: 'Ƙara Bukatun',
      addMoney: 'Ƙara Kuɗi',
      withdrawFunds: 'Ɗauki Kuɗi',
      
      // Dashboard
      dashboard: 'Wurin Aiki',
      welcome: 'Maraba',
      myGroups: 'Jamiyyoyina',
      mySavings: 'Tarar Kuɗina',
      transactions: 'Ma\'amaloli',
      profile: 'Profili',
      settings: 'Saitunan',
      logout: 'Fita',
      totalBalance: 'Duka Kuɗi',
      recentTransactions: 'Ma\'amaloli Kwanan',
      
      // Transactions
      transactionHistory: 'Tarihin Ma\'amaloli',
      transactionDate: 'Rana',
      transactionDescription: 'Bayanin',
      transactionAmount: 'Kuɗi',
      transactionType: 'Nau\'i',
      deposit: 'Ajiye',
      withdrawal: 'Ɗaukawe',
      transfer: 'Ɗauka',
      
      // Footer
      company: 'Kamfani',
      privacy: 'Bayyanar Keɓantacce',
      terms: 'Sharhin Aiki',
      contactHeading: 'Mu Da Saƙo',
      email: 'Saƙo: contactrubiesthrift@gmail.com',
      phone: 'Waya: 09032217418',
      language: 'Harshe',
      current: 'Jiya',
      copyright: '© 2025 RubiesThrift — Tanadin Kuɗi Jiya',
      
      // Blog
      insights: 'Labarin RubiesThrift',
      insightsDesc: 'Shawarwari a cikin tsarukan kuɗi, gudanarwa kuɗi, iyakacin kuɗi ta hanyar tanadin',
      searchArticles: 'Nema labarai...',
      allArticles: 'Duka Labarai',
      tipGuides: 'Shawarwari da Gabatarwa',
      trends: 'Mababbar Abubuwa',
      financialTips: 'Shawarwarin Kuɗi',
      featuredArticle: 'Labari Muhimmi',
      latestArticles: 'Labarai Sababi',
      readMore: 'Karanta Karuwa',
      noArticles: 'Babu labarai da suka dace da bincikinka. Gwada kalma ta banbanta ko nau\'i.',
      stayUpdated: 'Kashe Gari',
      subscribe: 'Biyo jere jakartarmu don labaran sababi da kayan sadarwa',
      enterEmail: 'Saki adireshin imel',
      subscribeBtn: 'Biyo',
      author: 'Marubucin',
      publishedOn: 'An buga a',
      readTime: 'karatu miniti',
      
      // Sign In / Sign Up
      welcomeBack: 'Maraba koma RubiesThrift. Shiga asusun ku.',
      phoneOrEmail: 'Waya ko Imel',
      password: 'Kalmar Sirri',
      forgotPassword: 'Kin sakaci kalmar sirrinki?',
      resetIt: 'Sake Ajiye Shi',
      dontHaveAccount: 'Ba ku da asusun?',
      createOne: 'Ƙira ɗaya',
      firstName: 'Sunan Gida',
      lastName: 'Sunan Gani',
      userType: 'Nau\'in Mai Amfani',
      agreeTerms: 'Na yarda da Sharhin Aiki da Bayyanar Keɓantacce',
      
      // Marketplace
      shopProducts: 'Sayo Kaya',
      cart: 'Kwandar',
      checkout: 'Ita Kuɗi',
      addToCart: 'Ƙara Cikin Kwandar',
      removeFromCart: 'Cire Daga Kwandar',
      viewCart: 'Gida Kwandar',
      yourCart: 'Kwandarka',
      subtotal: 'Duka Kaɗan',
      shipping: 'Aika',
      total: 'Jiya',
      proceedToCheckout: 'Ci Gaba Ita Kuɗi',
      
      // Support
      support: 'Taimako',
      contactUs: 'Tunkaruwa Mu',
      faq: 'Abubuwan Tambaye Da Yawa',
      helpCenter: 'Aiki Taimako',
      message: 'Saƙo',
      send: 'Aika',
      
      // Common Actions
      save: 'Tara',
      cancel: 'Soke',
      delete: 'Guba',
      edit: 'Tuntuba',
      create: 'Ƙira',
      update: 'Sabunta',
      updateGoal: 'Sabunta Manufa',
      exportCSV: 'Fitar da CSV',
      exportGoals: 'Fitar da Manufofi',
      quickAmounts: 'Adadin sauri',
      darkMode: 'Yanayin Duƙu',
      lightMode: 'Yanayin Haske',
      themeToggleDesc: 'Canza taken shafin zuwa duhu ko haske',
      submit: 'Aika',
      loading: 'Ana loda...',
      error: 'Kuskure',
      success: 'Nasara',
      warning: 'Gargadi',
      
      // Messages
      successfullySaved: 'An tara jiya!',
      deletedSuccessfully: 'An guba jiya!',
      errorOccurred: 'An fuskure',
      pleaseFilAllFields: 'Jiko cika duka fage',
      invalidEmail: 'Imel mara kyau',
      passwordMismatch: 'Kalmomi ba su dace ba',
    }
  };

  useEffect(() => {
    localStorage.setItem('selectedLanguage', selectedLanguage);
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: { language: selectedLanguage } }));
  }, [selectedLanguage]);

  const value = {
    selectedLanguage,
    setSelectedLanguage,
    t: (key) => translations[selectedLanguage][key] || key,
    translations
  };

  return (
    <TranslationContext.Provider value={value}>
      {children}
    </TranslationContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useTranslation() {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslation must be used within TranslationProvider');
  }
  return context;
}
