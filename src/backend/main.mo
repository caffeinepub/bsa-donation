import Map "mo:core/Map";
import Text "mo:core/Text";
import Nat "mo:core/Nat";
import Array "mo:core/Array";
import Iter "mo:core/Iter";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import List "mo:core/List";
import Order "mo:core/Order";
import Principal "mo:core/Principal";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";
import MixinStorage "blob-storage/Mixin";
import Storage "blob-storage/Storage";

actor {
  include MixinStorage();

  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  public type UserProfile = {
    name : Text;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  public type Donation = {
    donorName : Text;
    phone : Text;
    email : Text;
    amount : Nat;
    panNumber : Text;
    message : Text;
    timestamp : Time.Time;
  };

  module Donation {
    public func compareByAmount(a : Donation, b : Donation) : Order.Order {
      Nat.compare(b.amount, a.amount);
    };
  };

  public type SponsorshipTier = {
    #gold;
    #silver;
    #bronze;
  };

  module SponsorshipTier {
    public func compare(a : SponsorshipTier, b : SponsorshipTier) : Order.Order {
      switch (a, b) {
        case (#gold, #gold) { #equal };
        case (#gold, _) { #less };
        case (#silver, #gold) { #greater };
        case (#silver, #silver) { #equal };
        case (#silver, #bronze) { #less };
        case (#bronze, #bronze) { #equal };
        case (#bronze, _) { #greater };
      };
    };
  };

  public type Sponsorship = {
    companyName : Text;
    contactPerson : Text;
    designation : Text;
    phone : Text;
    email : Text;
    tier : SponsorshipTier;
    timestamp : Time.Time;
  };

  module Sponsorship {
    public func compare(a : Sponsorship, b : Sponsorship) : Order.Order {
      Text.compare(a.companyName, b.companyName);
    };
  };

  var notificationEmail : Text = "";

  let donations = List.empty<Donation>();
  let sponsorships = List.empty<Sponsorship>();

  public shared ({ caller }) func submitDonation(donation : Donation) : async () {
    donations.add(donation);
  };

  public shared ({ caller }) func submitSponsorship(sponsorship : Sponsorship) : async () {
    sponsorships.add(sponsorship);
  };

  public query ({ caller }) func getAllDonations() : async [Donation] {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can view all donations");
    };
    donations.toArray();
  };

  public query ({ caller }) func getAllSponsorships() : async [Sponsorship] {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can view all sponsorships");
    };
    sponsorships.toArray();
  };

  public query ({ caller }) func getTopDonors() : async [Donation] {
    donations.toArray().sort(Donation.compareByAmount).sliceToArray(
      0,
      Nat.min(10, donations.size()),
    );
  };

  public shared ({ caller }) func updateNotificationEmail(email : Text) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can update notification email");
    };
    notificationEmail := email;
  };

  public query ({ caller }) func getNotificationEmail() : async Text {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can view notification email");
    };
    notificationEmail;
  };
};
