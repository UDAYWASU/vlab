from getpass import getpass

from sqlalchemy import select

from app.db.session import SessionLocal
from app.models import User, Branch, Subject, Topic, Lab
from pwdlib import PasswordHash

password_hash = PasswordHash.recommended()


def main():
    with SessionLocal() as db:
        branch = db.scalar(
            select(Branch).where(Branch.slug == "robotics")
        )
        if branch is None:
            branch = Branch(name="Robotics", slug="robotics")
            db.add(branch)
            db.flush()

        subject = db.scalar(
            select(Subject).where(
                Subject.branch_id == branch.id,
                Subject.slug == "robotics-fundamentals",
            )
        )
        if subject is None:
            subject = Subject(
                branch_id=branch.id,
                name="Robotics Fundamentals",
                slug="robotics-fundamentals",
                description="Core concepts for working with robots.",
            )
            db.add(subject)
            db.flush()

        topic = db.scalar(
            select(Topic).where(
                Topic.subject_id == subject.id,
                Topic.slug == "coordinate-transformations",
            )
        )
        if topic is None:
            topic = Topic(
                subject_id=subject.id,
                name="Coordinate Transformations",
                slug="coordinate-transformations",
                description="Coordinate frames, rotation, and translation.",
            )
            db.add(topic)
            db.flush()

        lab = db.scalar(
            select(Lab).where(
                Lab.topic_id == topic.id,
                Lab.slug == "two-link-arm",
            )
        )
        if lab is None:
            db.add(
                Lab(
                    topic_id=topic.id,
                    name="Two-Link Robotic Arm",
                    slug="two-link-arm",
                    description="Explore the kinematics of a two-link arm.",
                    frontend_path="/labs/robotics/kinematics/two-link-arm",
                    is_published=True,
                    display_order=1,
                )
            )

        email = input("Initial user email: ").strip().lower()
        full_name = input("Full name: ").strip()
        password = getpass("Initial password (hidden): ")

        user = db.scalar(select(User).where(User.email == email))
        if user is None:
            db.add(
                User(
                    email=email,
                    full_name=full_name,
                    password_hash=password_hash.hash(password),
                )
            )
        else:
            print("That user already exists; keeping the existing account.")

        db.commit()
        print("Seed complete.")


if __name__ == "__main__":
    main()