import Storage "blob-storage/Storage";
import MixinStorage "blob-storage/Mixin";
import AccessControl "authorization/access-control";
import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";

actor {
  let storage = Storage.new();
  include MixinStorage(storage);

  // Initialize the user system state
  let accessControlState = AccessControl.initState();

  public type ImageType = {
    #jpeg;
    #png;
    #webp;
  };

  public type ImageMetadata = {
    filename : Text;
    uploadTimestamp : Int;
    imageType : ImageType;
    description : Text;
  };

  public type UserProfile = {
    name : Text;
  };

  var homepageImage : ?Storage.ExternalBlob = null;
  var logoImage : ?Storage.ExternalBlob = null;

  let imageMetadata = Map.empty<Text, ImageMetadata>();
  let userProfiles = Map.empty<Principal, UserProfile>();
  let _maxFileSize = 10_485_760;

  public shared ({ caller }) func initializeAccessControl() : async () {
    AccessControl.initialize(accessControlState, caller);
  };

  public query ({ caller }) func getCallerUserRole() : async AccessControl.UserRole {
    AccessControl.getUserRole(accessControlState, caller);
  };

  public shared ({ caller }) func assignCallerUserRole(user : Principal, role : AccessControl.UserRole) : async () {
    AccessControl.assignRole(accessControlState, caller, user, role);
  };

  public query ({ caller }) func isCallerAdmin() : async Bool {
    AccessControl.isAdmin(accessControlState, caller);
  };

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
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

  func checkAdminPermission(caller : Principal) {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };
  };

  public shared ({ caller }) func uploadHomepageImage(blob : Storage.ExternalBlob, filename : Text, timestamp : Int, imageType : ImageType) : async () {
    checkAdminPermission(caller);

    let metadata : ImageMetadata = {
      filename;
      uploadTimestamp = timestamp;
      imageType;
      description = "Homepage image";
    };

    homepageImage := ?blob;
    imageMetadata.add("homepage", metadata);
  };

  public shared ({ caller }) func uploadLogo(blob : Storage.ExternalBlob, filename : Text, timestamp : Int, imageType : ImageType) : async () {
    checkAdminPermission(caller);

    let metadata : ImageMetadata = {
      filename;
      uploadTimestamp = timestamp;
      imageType;
      description = "Logo image";
    };

    logoImage := ?blob;
    imageMetadata.add("logo", metadata);
  };

  public query ({ caller }) func getHomepageImage() : async ?Storage.ExternalBlob {
    homepageImage;
  };

  public query ({ caller }) func getLogoImage() : async ?Storage.ExternalBlob {
    logoImage;
  };

  public query ({ caller }) func getImageMetadata(category : Text) : async ?ImageMetadata {
    imageMetadata.get(category);
  };

  public query ({ caller }) func getAllImageMetadata() : async [(Text, ImageMetadata)] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can access this data");
    };
    imageMetadata.toArray();
  };

  public shared ({ caller }) func uploadImage(blob : Storage.ExternalBlob, filename : Text, timestamp : Int, imageType : ImageType, category : Text, description : Text) : async () {
    checkAdminPermission(caller);

    let metadata : ImageMetadata = {
      filename;
      uploadTimestamp = timestamp;
      imageType;
      description;
    };

    if (category == "homepage") { homepageImage := ?blob };
    if (category == "logo") { logoImage := ?blob };
    imageMetadata.add(category, metadata);
  };
};
