export interface WithdrawalInfo {
  withdrawMethod: 'BankTransfer' | 'MobileBanking';
  name: string;
  bankName?: string;
  bankAccountNumber?: string;
  branchName?: string;
  district?: string;
  mobileBankingName?: string;
  mobileBankingAccountNumber?: string;
  mobileUserDistrict?: string;
}

export interface User {
  userId: number;
  name: string;
  email: string;
  phoneNumber: string;
  userBalance: number;
  dailyProfit: number;
  outOfBalance: number;
  completedOrdersCount: number;
  quantityOfOrders: number;
  memberTotalRecharge: number;
  userType: string;
  trialRoundBalance: number;
  userSelectedPackage: number;
  score: number;
  checkInDays: number;
  lastCheckInDate?: string;
  orderCountForCheckIn: number;
  withdrawalAddressAndMethod: WithdrawalInfo | null;
  hasWithdrawPassword: boolean;
  withdrawPassword?: string;
  loginPassword?: string;
}

export interface Product {
  productId: string;
  name: string;
  year: number;
  poster: string;
  banner?: string;
  reviews: string;
  rating: number;
  price: number;
  commission: number;
  salePrice: number;
  status: 'Active' | 'Completed' | 'Pending';
  introduction: string;
  genre: string[];
  director: string;
  stars: string;
  boxOffice?: string;
  mysteryboxMethod?: '12x' | '3x' | 'cash';
  mysteryboxAmount?: string;
  isAdminAssigned?: boolean;
}

export interface OrderRecordItem {
  id: string;
  orderNumber: number;
  productId: string;
  productName: string;
  poster: string;
  price: number;
  commission: number;
  salePrice: number;
  status: 'completed' | 'uncompleted';
  createdAt: string;
  multiplier?: string;
}

export interface TransactionItem {
  id: string;
  type: 'withdraw' | 'checkIn' | 'recharge';
  amount: number;
  status: 'Success' | 'Pending' | 'Rejected';
  method?: string;
  accountNumber?: string;
  senderNumber?: string;
  transactionId?: string;
  notes?: string;
  createdAt: string;
}

export interface MysteryBoxData {
  method: '12x' | '3x' | 'cash';
  amount: string;
  productId: string;
  orderNumber?: number;
}
