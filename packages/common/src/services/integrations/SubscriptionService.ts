import type {
  ChangeSubscription,
  FetchReceipt,
  GetActivePayment,
  GetActiveSubscription,
  GetAllTransactions,
  GetPaymentDetails,
  GetSubscriptions,
  GetTransactions,
  UpdateCardDetails,
  UpdateSubscription,
} from '../../../types/subscription';

export default abstract class SubscriptionService {
  abstract getActiveSubscription: GetActiveSubscription;

  abstract getAllTransactions: GetAllTransactions;

  abstract getActivePayment: GetActivePayment;

  abstract getSubscriptions: GetSubscriptions;

  abstract updateSubscription: UpdateSubscription;

  abstract fetchReceipt: FetchReceipt;

  abstract changeSubscription?: ChangeSubscription;

  abstract updateCardDetails?: UpdateCardDetails;

  abstract getPaymentDetails?: GetPaymentDetails;

  abstract getTransactions?: GetTransactions;
}
