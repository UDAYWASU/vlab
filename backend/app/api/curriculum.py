from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.models.curriculum import Branch, Subject, Topic, Lab

router = APIRouter(prefix="/api", tags=["Curriculum"])


@router.get("/branches")
def list_branches(db: Session = Depends(get_db)):
    rows = db.scalars(
        select(Branch)
        .where(Branch.is_active.is_(True))
        .order_by(Branch.name)
    ).all()

    return [
        {"id": row.id, "name": row.name, "slug": row.slug}
        for row in rows
    ]


@router.get("/branches/{branch_slug}/subjects")
def list_subjects(
    branch_slug: str,
    db: Session = Depends(get_db),
):
    branch = db.scalar(
        select(Branch).where(
            Branch.slug == branch_slug,
            Branch.is_active.is_(True),
        )
    )
    if branch is None:
        raise HTTPException(404, "Branch not found")

    rows = db.scalars(
        select(Subject)
        .where(Subject.branch_id == branch.id)
        .order_by(Subject.name)
    ).all()

    return [
        {
            "id": row.id,
            "name": row.name,
            "slug": row.slug,
            "description": row.description,
        }
        for row in rows
    ]


@router.get("/subjects/{subject_id}/topics")
def list_topics(
    subject_id: int,
    db: Session = Depends(get_db),
):
    if db.get(Subject, subject_id) is None:
        raise HTTPException(404, "Subject not found")

    rows = db.scalars(
        select(Topic)
        .where(Topic.subject_id == subject_id)
        .order_by(Topic.name)
    ).all()

    return [
        {
            "id": row.id,
            "name": row.name,
            "slug": row.slug,
            "description": row.description,
        }
        for row in rows
    ]


@router.get("/topics/{topic_id}/labs")
def list_labs(
    topic_id: int,
    db: Session = Depends(get_db),
):
    if db.get(Topic, topic_id) is None:
        raise HTTPException(404, "Topic not found")

    rows = db.scalars(
        select(Lab)
        .where(
            Lab.topic_id == topic_id,
            Lab.is_published.is_(True),
        )
        .order_by(Lab.display_order, Lab.name)
    ).all()

    return [
        {
            "id": row.id,
            "name": row.name,
            "slug": row.slug,
            "description": row.description,
            "frontend_path": row.frontend_path,
        }
        for row in rows
    ]